"use client";

import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { handlePokemonCardColor } from "@/utils/handlePokemonCardColor";
import { formatPokemonName, formatPokemonNumber } from "@/utils/pokemonFormat";
import PokemonType from "../pokemon-type";
import PokemonArtwork from "../pokemon-artwork";

interface TeamPokemonSlotProps {
  pokemonId: number;
  types: string[];
  onRemove: () => void;
}

export const EmptyTeamSlot = () => (
  <div className="flex min-h-[188px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/10 text-sm text-gray-500">
    <span className="h-12 w-12 rounded-full border-2 border-white/10" />
    Vazio
  </div>
);

const TeamPokemonSlot = ({
  pokemonId,
  types,
  onRemove,
}: TeamPokemonSlotProps) => {
  const { data: pokemons } = useGetPokemons();
  const name = formatPokemonName(
    pokemons?.find((pokemon) => pokemon.id === pokemonId)?.name ?? ""
  );

  return (
    <div
      style={types.length > 0 ? handlePokemonCardColor(types[0]) : undefined}
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
      <PokemonArtwork pokemonId={pokemonId} alt={name} size={88} />
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
