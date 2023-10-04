"use client";

import SearchInput from "../components/SearchInput";
const Pokemons = () => {
  return (
        <main className="relative flex max-w-screen max-h-screen flex-col items-center justify-center">
          <div className="absolute top-4 right-0">

          <SearchInput placeHolder="Pesquise um pokemon..." />
          </div>
        </main>
  );
};
export default Pokemons;
