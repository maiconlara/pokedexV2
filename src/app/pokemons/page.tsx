"use client";

import SearchButton from "../components/SearchButton";
import PokemonContainer from "../components/PokemonContainer";
import SearchInput from "../components/SearchInput";
import { getPokemonByName, getPokemonList } from "../api/api";
import { useState, useEffect } from "react";
import { PokemonList, Pokemon } from "../interface/interface";
const Pokemons = () => {
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [pokemonLimit, setPokemonLimit] = useState(10);

  const handlePokemonList = async () => {
    const response = await getPokemonList(pokemonLimit);
    setPokemonList(response.results);
  };

  useEffect(() => {
    handlePokemonList();
  }, [pokemonLimit]);

  const handlePokemonSearch = async () => {
    console.log("pokemonList: ", pokemonList);
  };
  // const limitincrease = async () => {
  //   setPokemonLimit((prevLimit) => prevLimit + 1);
  // };

  return (
    <main className="relative flex max-w-screen flex-col items-center justify-center">
      <div className="absolute flex flex-row gap-2 top-10 md:right-2 w-full md:w-auto px-6 md:px-10 ">
        <SearchInput
          setSearchText={setSearchText}
          placeHolder="Digite um nome..."
        />
        <SearchButton handlePokemonSearch={handlePokemonSearch} />
      </div>
      <PokemonContainer />
    </main>
  );
};
export default Pokemons;
