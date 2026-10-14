import { UseQueryResult, useQueries } from "@tanstack/react-query";
import { PokemonTypeList, TypeDamageRelations } from "@/types/pokemon-type-list";
import { getIdFromUrl } from "@/utils/pokemonFormat";
import { POKEMON_TYPE_NAMES } from "@/utils/typeEffectiveness";
import { pokemonTypeQueryOptions } from "./useGetPokemonsType";

const FIRST_ALTERNATE_FORM_ID = 10000;

/**
 * Builds the types of every pokemon and the damage relations of every type
 * from the 18 `/type` responses, so lists never need one request per pokemon.
 *
 * @param results - One query result per type, in `POKEMON_TYPE_NAMES` order.
 * @returns Types per national dex number (primary type first), damage
 *          relations per type name, and the combined loading state.
 */
const toTypeIndex = (results: UseQueryResult<PokemonTypeList>[]) => {
  const isPending = results.some((result) => result.isPending);
  const isError = results.some((result) => result.isError);
  const slotsById = new Map<number, { slot: number; type: string }[]>();
  const relationsByType = new Map<string, TypeDamageRelations>();

  results.forEach(({ data }) => {
    if (!data) return;

    relationsByType.set(data.name, data.damage_relations);
    data.pokemon.forEach(({ pokemon, slot }) => {
      const id = getIdFromUrl(pokemon.url);
      if (id >= FIRST_ALTERNATE_FORM_ID) return;
      slotsById.set(id, [...(slotsById.get(id) ?? []), { slot, type: data.name }]);
    });
  });

  const typesById = new Map(
    Array.from(slotsById, ([id, slots]) => [
      id,
      [...slots].sort((a, b) => a.slot - b.slot).map((item) => item.type),
    ])
  );

  const retry = () => {
    results
      .filter((result) => result.isError)
      .forEach((result) => result.refetch());
  };

  return { typesById, relationsByType, isPending, isError, retry };
};

export const usePokemonTypeIndex = () => {
  return useQueries({
    queries: POKEMON_TYPE_NAMES.map((type) => pokemonTypeQueryOptions(type)),
    combine: toTypeIndex,
  });
};
