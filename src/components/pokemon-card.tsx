import { useGetPokemonData } from "@/utils/hooks/useGetPokemonData";
// import Image from "next/image";
import { Skeleton, Image } from "@nextui-org/react";
import { handlePokemonCardColor } from "@/utils/handlePokemonCardColor";
import PokemonType from "./pokemon-type";
interface PokemonCardProps {
  id: string;
}

const PokemonCard = ({ id }: PokemonCardProps) => {
  console.log("Rendering PokemonCard for id:", id);
  const { data, isLoading } = useGetPokemonData(id);
  const firstType = data?.types[0]?.type.name || "";
  const secondType = data?.types[1]?.type.name || "";
  const name = data?.name || "";
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const formattedId = data?.id.toString().padStart(3, "0") || "";

  const gameArtwork = data?.sprites.front_default || "";
  const officialArtwork =
    data?.sprites.other["official-artwork"].front_default || "";
  const pokemonImage = officialArtwork ? officialArtwork : gameArtwork;
  const typeColor = handlePokemonCardColor(firstType);

  return (
    <Skeleton
      isLoaded={!isLoading}
      disableAnimation
      className="rounded-lg"
      classNames={{
        base: ["bg-[#aaa]"],
      }}
    >
      <div
        style={typeColor}
        className="flex flex-col w-full items-center justify-center h-[160px] md:w-[180px] lg:w-[200px] xl:w-[290px] 2xl:w-[220px] rounded-2xl"
      >
        <div className="flex flex-row w-full justify-between px-5 pt-3 h-[48px] font-medium text-sm tracking-wide">
          <p>{formattedName}</p>
          <p>#{formattedId}</p>
        </div>

        <div className="flex flex-row w-full h-full items-start">
          <div className="flex flex-col w-auto px-5 pt-3 font-medium text-sm gap-1">
            {firstType && <PokemonType type={firstType} />}
            {secondType && <PokemonType type={secondType} />}
          </div>

          <Image
            className="cursor-pointer rounded-2xl"
            loading="lazy"
            src={pokemonImage}
            alt={data?.name}
            width={120}
            disableSkeleton
            height={120}
          />
        </div>
      </div>
    </Skeleton>
  );
};
export default PokemonCard;
