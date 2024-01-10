"use client";
import PokemonCard from "./pokemon-card";
import PokemonList from "./pokemon-list";
import SearchInput from "./search-input";
import TypeFilter from "./type-filter";

const PokemonContainer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center w-full min-h-[80vh] mt-[5rem] pb-5 gap-8">
      <div className="flex flex-col w-full gap-4 md:w-[30vw] lg:w-[20vw] xl:w-[20vw] 2xl:w-[12vw]">
        <SearchInput placeHolder="Digite um nome..." />
        <TypeFilter />
      </div>
      <div className="flex flex-col md:flex-row  md:items-start w-full h-full gap-4">
        <PokemonList />
      </div>
    </div>
  );
};
export default PokemonContainer;
