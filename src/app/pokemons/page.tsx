"use client";

import { useState, useEffect } from "react";
import SearchInput from "@/components/search-input";
import SearchButton from "@/components/search-button";
import PokemonContainer from "@/components/pokemon-container";
import { Pokemon } from "@/types/pokemon";
const Pokemons = () => {
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();

  const handlePokemonSearch = async () => {
    console.log("pokemonList: ", pokemonList);
  };

  return (
    <main className="relative flex max-w-screen flex-col items-center justify-center">
      <div className="absolute flex flex-row gap-2 top-10 md:right-2 w-full md:w-auto px-6 md:px-10 items-center">
        <SearchInput
          setSearchText={setSearchText}
          placeHolder="Digite um nome..."
        />
        {/* <SearchButton handlePokemonSearch={handlePokemonSearch} /> */}
      </div>
      <PokemonContainer />
    </main>
  );
};
export default Pokemons;
