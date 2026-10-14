import { useQueries } from "@tanstack/react-query";
import { TypeDamageRelations } from "@/types/pokemon-type-list";
import { getTeamCoverage } from "@/utils/typeEffectiveness";
import { pokemonDataQueryOptions } from "./useGetPokemonData";
import { pokemonTypeQueryOptions } from "./useGetPokemonsType";

/**
 * Loads the types of every team member and their damage relations,
 * reusing the same cache as the pokemon list and details page.
 *
 * @param pokemonIds - Team members in slot order (repeated ids allowed).
 * @returns The team coverage per attacking type, plus loading and error state.
 */
export const useTeamCoverage = (pokemonIds: number[]) => {
  const uniqueIds = Array.from(new Set(pokemonIds));
  const pokemonResults = useQueries({
    queries: uniqueIds.map((id) => pokemonDataQueryOptions(id)),
  });

  const typesById = new Map(
    uniqueIds.map((id, index) => [
      id,
      pokemonResults[index]?.data?.types.map((item) => item.type.name) ?? [],
    ])
  );
  const uniqueTypes = Array.from(
    new Set(Array.from(typesById.values()).flat())
  );
  const typeResults = useQueries({
    queries: uniqueTypes.map((type) => pokemonTypeQueryOptions(type)),
  });

  const relationsByType = new Map(
    uniqueTypes.map((type, index) => [
      type,
      typeResults[index]?.data?.damage_relations,
    ])
  );

  const allResults = [...pokemonResults, ...typeResults];
  const isError = allResults.some((result) => result.isError);
  const isPending = allResults.some((result) => result.isPending);

  const retry = () => {
    allResults
      .filter((result) => result.isError)
      .forEach((result) => result.refetch());
  };

  if (isError || isPending) {
    return { coverage: [], isError, isPending, retry };
  }

  const coverage = getTeamCoverage(
    pokemonIds.map((pokemonId) => ({
      pokemonId,
      relations: (typesById.get(pokemonId) ?? []).flatMap((type) => {
        const relations = relationsByType.get(type);
        return relations ? [relations] : ([] as TypeDamageRelations[]);
      }),
    }))
  );

  return { coverage, isError, isPending, retry };
};
