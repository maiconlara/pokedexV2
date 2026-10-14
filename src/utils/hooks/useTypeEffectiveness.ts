import { useQueries } from "@tanstack/react-query";
import { pokemonTypeQueryOptions } from "./useGetPokemonsType";
import { getDefensiveMultipliers } from "@/utils/typeEffectiveness";

export const useTypeEffectiveness = (types: string[]) => {
  return useQueries({
    queries: types.map((type) => pokemonTypeQueryOptions(type)),
    combine: (results) => {
      const isLoading = results.some((result) => result.isPending);
      const isError = results.some((result) => result.isError);
      const relations = results.flatMap((result) =>
        result.data ? [result.data.damage_relations] : []
      );

      return {
        isLoading,
        isError,
        multipliers:
          isLoading || isError ? [] : getDefensiveMultipliers(relations),
      };
    },
  });
};
