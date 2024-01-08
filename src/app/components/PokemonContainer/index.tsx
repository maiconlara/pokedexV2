import TypeFilter from "../TypeFilter";
import PokemonCard from "../pokemon-card";

const PokemonContainer = () => {
  return (
    <div className="flex justify-center w-full min-h-[80vh] mt-20 pb-5">
      <div className="flex flex-col md:flex-row justify-center md:items-start w-full h-full">
        <TypeFilter />
        <div className="grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:min-w-[85vw] md:max-w-full m-4 rounded-lg p-4 gap-4">
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
