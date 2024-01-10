import PokemonCard from "./pokemon-card";

const PokemonList = () => {
  return (
    <div className="grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:w-full rounded-lg gap-4">
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
  );
};
export default PokemonList;
