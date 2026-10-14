import { TypeDamageRelations } from "@/types/pokemon-type-list";
import { getTeamCoverage } from "@/utils/typeEffectiveness";
import { usePokemonTypeIndex } from "./usePokemonTypeIndex";

/**
 * Calculates the team coverage from the shared type index, so it needs no
 * request per team member.
 *
 * @param pokemonIds - Team members in slot order (repeated ids allowed).
 * @returns The team coverage per attacking type, plus loading and error state.
 */
export const useTeamCoverage = (pokemonIds: number[]) => {
  const { typesById, relationsByType, isPending, isError, retry } =
    usePokemonTypeIndex();

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
