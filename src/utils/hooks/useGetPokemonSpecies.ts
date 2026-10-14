import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PokemonSpecies } from "@/types/pokemon-species";

const getPokemonSpeciesRequest = async (pokeId: number) => {
  const { data } = await api.get<PokemonSpecies>(`/pokemon-species/${pokeId}`);
  return data;
};

export const pokemonSpeciesQueryOptions = (pokeId: number) =>
  queryOptions({
    queryKey: ["pokemonSpecies", pokeId],
    queryFn: () => getPokemonSpeciesRequest(pokeId),
  });

export const useGetPokemonSpecies = (pokeId: number) => {
  return useQuery(pokemonSpeciesQueryOptions(pokeId));
};
