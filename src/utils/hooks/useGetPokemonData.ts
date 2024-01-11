import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Pokemon } from "@/types/pokemon";

const getPokemonDataRequest = async (pokeId: string) => {
  const { data } = await api.get<Pokemon>(`/pokemon/${pokeId}`);
  return data;
};

export const useGetPokemonData = (pokeId: string) => {
  return useQuery({
    queryKey: ["pokemonData", pokeId],
    queryFn: () => getPokemonDataRequest(pokeId),
  });
};
