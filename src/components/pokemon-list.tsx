"use client";

import PokemonCard from "./pokemon-card";

import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { useGetPokemonsType } from "@/utils/hooks/useGetPokemonsType";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

interface FormattedPokemons {
  id: string;
}

const PokemonList = () => {
  const [type] = useQueryState("type");
  const { data: { results: pokemons = [] } = {} } = useGetPokemons();
  const { data, refetch, isRefetching } = useGetPokemonsType(type || "");

  useEffect(() => {
    refetch();
  }, [type]);



  const formattedPokemons: FormattedPokemons[] = pokemons.map((pokemon) => {
    const urlParts = pokemon.url.split("/");
    const id = urlParts[urlParts.length - 2];

    return {
      id,
    };
  });

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:w-[376px] lg:w-[632px] xl:w-[902px] 2xl:w-[1164px]  ">
      {formattedPokemons.map((pokemon) => {
        return <PokemonCard key={pokemon.id} id={pokemon.id} />;
      })}
    </div>
  );
};
export default PokemonList;
