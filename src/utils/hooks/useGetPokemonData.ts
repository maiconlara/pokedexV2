import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Pokemon } from "@/types/pokemon";

const getPokemonDataRequest = async (pokeId: number) => {
  const { data } = await api.get<Pokemon>(`/pokemon/${pokeId}`);
  return data;
};

export const pokemonDataQueryOptions = (pokeId: number) =>
  queryOptions({
    queryKey: ["pokemonData", pokeId],
    queryFn: () => getPokemonDataRequest(pokeId),
  });

export const useGetPokemonData = (pokeId: number) => {
  return useQuery(pokemonDataQueryOptions(pokeId));
};
