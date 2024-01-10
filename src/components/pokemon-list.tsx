import PokemonCard from "./pokemon-card";
import { useGetPokemons } from "@/utils/hooks/useGetPokemons";

const PokemonList = () => {
  const { data: { results: pokemons = [] } = {} } = useGetPokemons();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:w-[376px] lg:w-[632px] xl:w-[662px] 2xl:w-[1164px]  ">
      {pokemons.map((pokemon) => {
        return <PokemonCard key={pokemon.name} name={pokemon.name} />;
      })}
    </div>
  );
};
export default PokemonList;
