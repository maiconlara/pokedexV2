import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PokemonListResponse } from "@/types/pokemon-list";

const getPokemonsRequest = async () => {
    const { data } = await api.get<PokemonListResponse>("/pokemon/", {
        params: {
            limit: 30,
        },
    });
    return data;
};

export const useGetPokemons = () => {
    return useQuery({queryKey: ["pokemonResponse"], queryFn: getPokemonsRequest});
};
