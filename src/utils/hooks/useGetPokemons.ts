import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PokemonEntry, PokemonListResponse } from "@/types/pokemon-list";
import { getIdFromUrl } from "@/utils/pokemonFormat";

const getPokemonsRequest = async () => {
  const { data } = await api.get<PokemonListResponse>("/pokemon-species/", {
    params: {
      limit: 100000,
    },
  });
  return data;
};

const toPokemonEntries = (data: PokemonListResponse): PokemonEntry[] =>
  data.results
    .map((pokemon) => ({ id: getIdFromUrl(pokemon.url), name: pokemon.name }))
    .sort((a, b) => a.id - b.id);

export const useGetPokemons = () => {
  return useQuery({
    queryKey: ["pokemonIndex"],
    queryFn: getPokemonsRequest,
    select: toPokemonEntries,
  });
};
