import PokemonCard from "./pokemon-card";
import TypeFilter from "./type-filter";

const PokemonContainer = () => {
  return (
    <div className="flex justify-center w-full min-h-[80vh] mt-[5.60rem] pb-5">
      <div className="flex flex-col md:flex-row justify-center md:items-start w-full h-full">
        <TypeFilter />
        <div className="grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:min-w-[55vw] md:max-w-full  lg:min-w-[80vw] lg:max-w-full m-4 rounded-lg p-4 gap-4">
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
        </div>
      </div>
    </div>
  );
};
export default PokemonContainer;
