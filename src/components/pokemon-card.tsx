
interface PokemonCardProps {
  name: string
}

const PokemonCard = ({name}: PokemonCardProps) => {
  return (
    <div className="w-full h-[150px] md:w-[180px] lg:w-[200px] xl:w-[290px] 2xl:w-[220px] border border-gray-300/40 rounded-2xl bg-sky-300/40">
      {name}
    </div>
  );
};
export default PokemonCard;
