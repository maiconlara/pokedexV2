"use client";

import SearchInput from "../components/SearchInput";
const Pokemons = () => {
  return (
    <main className="relative flex max-w-screen flex-col items-center justify-center">
      <div className="absolute top-10 md:right-2 w-full md:w-auto px-6 md:px-4 ">
        <SearchInput placeHolder="Pesquise um pokemon..." />
      </div>

      <div className="flex justify-center w-full min-h-[80vh] mt-20 pb-5">
      <div className="flex flex-col md:flex-row justify-center w-full h-full">

        <div className="grid grid-cols-2 md:flex md:flex-col m-4 p-4 gap-4 md:-w-[20vw] rounded-lg">
        <div className="w-full md:w-[200px] h-[30px] border border-gray-300/40"></div>
        <div className="w-full md:w-[200px] h-[30px] border border-gray-300/40"></div>
        <div className="w-full md:w-[200px] h-[30px] border border-gray-300/40"></div>
        <div className="w-full md:w-[200px] h-[30px] border border-gray-300/40"></div>
      
       
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-wrap m-4  rounded-lg p-4 gap-4">
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
       <div className="w-full md:w-[150px] h-[150px] border border-gray-300/40"></div>
     
        </div>
      </div>
      </div>
    </main>
  );
};
export default Pokemons;
