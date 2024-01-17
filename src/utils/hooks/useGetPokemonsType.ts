import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PokemonTypeList } from "@/types/pokemon-type-list";

const getPokemonsTypeRequest = async (type: string) => {
  const { data } = await api.get<PokemonTypeList>(`/type/${type}`);
  return data;
};

export const useGetPokemonsType = (type: string) => {
  return useQuery({
    queryKey: ["pokemonType"],
    queryFn: () => getPokemonsTypeRequest(type),
    enabled: false,
  });
};
