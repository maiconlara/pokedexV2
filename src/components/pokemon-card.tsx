import { useGetPokemonData } from "@/utils/hooks/useGetPokemonData";
// import Image from "next/image";
import { Skeleton, Image } from "@nextui-org/react";
import fallBackImage from "@/app/icon.png";
import { handleTypeColors } from "@/utils/handleTypeColor";
interface PokemonCardProps {
  id: string;
}

const PokemonCard = ({ id }: PokemonCardProps) => {
  const { data, isLoading } = useGetPokemonData(id);
  const firstType = data?.types[0]?.type.name || "";
  const secondType = data?.types[1]?.type.name || "";
  const name = data?.name || "";
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const typeColor = handleTypeColors(firstType);
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
        className="flex flex-col w-full items-center justify-center h-[150px] md:w-[180px] lg:w-[200px] xl:w-[290px] 2xl:w-[220px] rounded-2xl"
      >
        <div className="flex flex-row w-full justify-between px-5">
          <p>{formattedName}</p>
          <p>{data?.id}</p>
        </div>

        <div className="flex flex-row w-full h-full items-center">
          <div className="flex flex-col w-auto px-5">
            {firstType && <p>{firstType}</p>}
            {secondType && <p>{secondType}</p>}
          </div>

          <Image
            className="cursor-pointer rounded-2xl"
            loading="lazy"
            isZoomed
            src={data?.sprites.other["official-artwork"].front_default || ""}
            alt={data?.name}
            width={100}
            disableSkeleton
            height={100}
          />
        </div>
      </div>
    </Skeleton>
  );
};
export default PokemonCard;
