import TypeFilter from "../TypeFilter";

const PokemonContainer = () => {
  return (
    <div className="flex justify-center w-full min-h-[80vh] mt-20 pb-5">
      <div className="flex flex-col md:flex-row justify-center items-start w-full h-full">
        <TypeFilter />
        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap m-4  rounded-lg p-4 gap-4">
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
  );
};
export default PokemonContainer;
