"use client";

import PokemonContainer from "../components/PokemonContainer";
import SearchInput from "../components/SearchInput";
import { useState } from "react";
const Pokemons = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <main className="relative flex max-w-screen flex-col items-center justify-center">
      <div className="absolute top-10 md:right-2 w-full md:w-auto px-6 md:px-4 ">
        <SearchInput setSearchText={setSearchText} placeHolder="Pesquise um pokemon..." />
      </div>
        <PokemonContainer />

    </main>
  );
};
export default Pokemons;
