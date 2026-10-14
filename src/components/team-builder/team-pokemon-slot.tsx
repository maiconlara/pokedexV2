"use client";

import { Image } from "@nextui-org/react";
import { useGetPokemonData } from "@/utils/hooks/useGetPokemonData";
import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { handlePokemonCardColor } from "@/utils/handlePokemonCardColor";
import {
  formatPokemonName,
  formatPokemonNumber,
  getArtworkUrl,
} from "@/utils/pokemonFormat";
import PokemonType from "../pokemon-type";

interface TeamPokemonSlotProps {
  pokemonId: number;
  onRemove: () => void;
}

export const EmptyTeamSlot = () => (
  <div className="flex min-h-[188px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/10 text-sm text-gray-500">
    <span className="h-12 w-12 rounded-full border-2 border-white/10" />
    Vazio
  </div>
);

const TeamPokemonSlot = ({ pokemonId, onRemove }: TeamPokemonSlotProps) => {
  const { data: pokemons } = useGetPokemons();
  const { data } = useGetPokemonData(pokemonId);

  const slug =
    pokemons?.find((pokemon) => pokemon.id === pokemonId)?.name ??
    data?.species.name ??
    "";
  const name = formatPokemonName(slug);
  const types = data?.types.map((item) => item.type.name) ?? [];

  return (
    <div
      style={data ? handlePokemonCardColor(types[0] ?? "") : undefined}
      className="relative flex min-h-[188px] flex-col items-center gap-1 rounded-2xl bg-white/10 p-3 pt-4 text-center"
    >
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remover ${name} do time`}
        className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-base leading-none text-white transition-colors hover:bg-black/50"
      >
        ×
      </button>
      <Image
        src={getArtworkUrl(pokemonId)}
        alt={name}
        width={88}
        height={88}
        disableSkeleton
      />
      <span className="text-xs opacity-80">{formatPokemonNumber(pokemonId)}</span>
      <span className="font-bold text-sm leading-tight">{name}</span>
      <div className="flex w-full flex-col gap-1 px-1 text-xs font-medium">
        {types.map((type) => (
          <PokemonType key={type} type={type} />
        ))}
      </div>
    </div>
  );
};
export default TeamPokemonSlot;
