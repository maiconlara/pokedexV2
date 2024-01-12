import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PokemonListResponse } from "@/types/pokemon-list";

const getPokemonsTypeRequest = async (type: string) => {
  const { data } = await api.get<PokemonListResponse>(`/type/${type}`);
  return data;
};

export const useGetPokemonsType = (type: string) => {
  return useQuery({
    queryKey: ["pokemonType"],
    queryFn: () => getPokemonsTypeRequest(type),
  });
};
