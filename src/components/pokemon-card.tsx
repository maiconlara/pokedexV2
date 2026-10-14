import { useRef } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { pokemonDataQueryOptions } from "@/utils/hooks/useGetPokemonData";
import { pokemonSpeciesQueryOptions } from "@/utils/hooks/useGetPokemonSpecies";
import { handlePokemonCardColor } from "@/utils/handlePokemonCardColor";
import { formatPokemonName, formatPokemonNumber } from "@/utils/pokemonFormat";
import PokemonType from "./pokemon-type";
import PokemonArtwork from "./pokemon-artwork";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
}

const PREFETCH_DELAY_MS = 150;

const PokemonCard = ({ id, name, types }: PokemonCardProps) => {
  const queryClient = useQueryClient();
  const prefetchTimer = useRef<ReturnType<typeof setTimeout>>();
  const formattedName = formatPokemonName(name);
  const typeColor = handlePokemonCardColor(types[0] ?? "");

  const prefetchDetails = () => {
    queryClient.prefetchQuery(pokemonDataQueryOptions(id));
    queryClient.prefetchQuery(pokemonSpeciesQueryOptions(id));
  };

  const schedulePrefetch = () => {
    prefetchTimer.current = setTimeout(prefetchDetails, PREFETCH_DELAY_MS);
  };

  const cancelPrefetch = () => clearTimeout(prefetchTimer.current);

  return (
    <Link
      href={`/pokemons/${id}`}
      aria-label={`Ver detalhes de ${formattedName}`}
      onMouseEnter={schedulePrefetch}
      onMouseLeave={cancelPrefetch}
      onFocus={prefetchDetails}
      onTouchStart={prefetchDetails}
      className="rounded-2xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
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
            {types.map((type) => (
              <PokemonType key={type} type={type} />
            ))}
          </div>

          <PokemonArtwork
            pokemonId={id}
            alt={formattedName}
            size={120}
            className="rounded-2xl"
          />
        </div>
      </div>
    </Link>
  );
};
export default PokemonCard;
