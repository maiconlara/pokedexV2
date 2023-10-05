"use client";

import SearchInput from "../components/SearchInput";
const Pokemons = () => {
  return (
    <main className="relative flex max-w-screen flex-col items-center justify-center">
      <div className="absolute top-10 right-2">
        <SearchInput placeHolder="Pesquise um pokemon..." />
      </div>

      <div className="flex justify-center w-full min-h-[80vh] mt-20 pb-5">
      <div className="flex flex-row justify-center w-full h-full">
        <div className="flex flex-col m-4 p-4 gap-4 w-[20vw] rounded-lg">
        <div className="w-[200px] h-[30px] border border-gray-300/40"></div>
        <div className="w-[200px] h-[30px] border border-gray-300/40"></div>
        <div className="w-[200px] h-[30px] border border-gray-300/40"></div>
        <div className="w-[200px] h-[30px] border border-gray-300/40"></div>
        </div>
        <div className="flex flex-wrap m-4 w-[70vw] rounded-lg p-4 gap-4">
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-[150px] h-[150px] border border-gray-300/40"></div>
        </div>
      </div>
      </div>
    </main>
  );
};
export default Pokemons;
