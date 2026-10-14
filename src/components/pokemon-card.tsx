import Link from "next/link";
import { useGetPokemonData } from "@/utils/hooks/useGetPokemonData";
import { Skeleton, Image } from "@nextui-org/react";
import { handlePokemonCardColor } from "@/utils/handlePokemonCardColor";
import {
  formatPokemonName,
  formatPokemonNumber,
  getArtworkUrl,
} from "@/utils/pokemonFormat";
import PokemonType from "./pokemon-type";

interface PokemonCardProps {
  id: number;
  name: string;
}

const PokemonCard = ({ id, name }: PokemonCardProps) => {
  const { data, isLoading } = useGetPokemonData(id);
  const firstType = data?.types[0]?.type.name || "";
  const secondType = data?.types[1]?.type.name || "";
  const formattedName = formatPokemonName(name);

  const pokemonImage =
    data?.sprites.other["official-artwork"].front_default ||
    data?.sprites.front_default ||
    getArtworkUrl(id);
  const typeColor = handlePokemonCardColor(firstType);

  return (
    <Link
      href={`/pokemons/${id}`}
      aria-label={`Ver detalhes de ${formattedName}`}
      className="rounded-2xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <Skeleton
        isLoaded={!isLoading}
        disableAnimation
        className="rounded-2xl"
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
            <p>{formatPokemonNumber(id)}</p>
          </div>

          <div className="flex flex-row w-full h-full items-start">
            <div className="flex flex-col w-auto px-5 pt-3 font-medium text-sm gap-1">
              {firstType && <PokemonType type={firstType} />}
              {secondType && <PokemonType type={secondType} />}
            </div>

            <Image
              className="rounded-2xl"
              src={pokemonImage}
              alt={formattedName}
              width={120}
              disableSkeleton
              height={120}
            />
          </div>
        </div>
      </Skeleton>
    </Link>
  );
};
export default PokemonCard;
