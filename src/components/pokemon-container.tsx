import PokemonList from "./pokemon-list";
import SearchInput from "./search-input";
import TypeFilter from "./type-filter";
import TypeSelect from "./type-select";

const PokemonContainer = () => {

  return (
    <div className="flex flex-col md:flex-row w-full md:w-[90vw] min-h-[80vh] mt-[2rem] md:mt-[5rem] pb-5 justify-center gap-8">
      <div className="flex flex-col w-full gap-4 items-center md:w-[30vw] lg:w-[20vw] xl:w-[20vw] 2xl:w-[12vw]">
        <SearchInput placeHolder="Nome ou número..." />
        <TypeSelect />
        <TypeFilter />
      </div>
      <PokemonList />
    </div>
  );
};
export default PokemonContainer;
