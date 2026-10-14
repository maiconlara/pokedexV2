import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PokemonTypeList } from "@/types/pokemon-type-list";
import { getIdFromUrl } from "@/utils/pokemonFormat";

const FIRST_ALTERNATE_FORM_ID = 10000;

const getPokemonsTypeRequest = async (type: string) => {
  const { data } = await api.get<PokemonTypeList>(`/type/${type}`);
  return data;
};

export const pokemonTypeQueryOptions = (type: string) =>
  queryOptions({
    queryKey: ["pokemonType", type],
    queryFn: () => getPokemonsTypeRequest(type),
  });

const toNationalDexIds = (data: PokemonTypeList) =>
  new Set(
    data.pokemon
      .map((slot) => getIdFromUrl(slot.pokemon.url))
      .filter((id) => id < FIRST_ALTERNATE_FORM_ID)
  );

export const useGetPokemonsType = (type: string | null) => {
  return useQuery({
    ...pokemonTypeQueryOptions(type ?? ""),
    enabled: Boolean(type),
    select: toNationalDexIds,
  });
};
