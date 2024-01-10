"use client";

import { useState, useEffect } from "react";
import SearchInput from "@/components/search-input";
import PokemonContainer from "@/components/pokemon-container";
import { Pokemon } from "@/types/pokemon";
const Pokemons = () => {
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();

  const handlePokemonSearch = async () => {
    console.log("pokemonList: ", pokemonList);
  };

  return (
    <main className="flex flex-col max-w-screen  items-center justify-center md:px-5 lg:px-8 xl:px-10 2xl:px-2">
      <PokemonContainer />
    </main>
  );
};
export default Pokemons;
