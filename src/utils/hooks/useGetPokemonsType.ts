import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PokemonTypeList } from "@/types/pokemon-type-list";

const getPokemonsTypeRequest = async (type: string) => {
  const { data } = await api.get<PokemonTypeList>(`/type/${type}`);
  return data;
};

export const pokemonTypeQueryOptions = (type: string) =>
  queryOptions({
    queryKey: ["pokemonType", type],
    queryFn: () => getPokemonsTypeRequest(type),
  });
