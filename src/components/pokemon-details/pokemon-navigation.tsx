"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { formatPokemonName, formatPokemonNumber } from "@/utils/pokemonFormat";
import { ChevronIcon } from "@/assets/chevron-icon";

interface PokemonNavigationProps {
  id: number;
}

const linkClassName =
  "flex items-center gap-2 rounded-xl bg-[#121326] px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10";

const PokemonNavigation = ({ id }: PokemonNavigationProps) => {
  const router = useRouter();
  const { data: pokemons } = useGetPokemons();
  const previous = pokemons?.find((pokemon) => pokemon.id === id - 1);
  const next = pokemons?.find((pokemon) => pokemon.id === id + 1);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/pokemons");
  };

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3">
      <Button
        variant="light"
        onPress={handleBack}
        startContent={<ChevronIcon className="rotate-180" />}
        className="text-gray-200 font-medium"
      >
        Voltar
      </Button>
      <div className="flex gap-2">
        {previous && (
          <Link href={`/pokemons/${previous.id}`} replace className={linkClassName}>
            <ChevronIcon className="rotate-180" />
            <span className="text-gray-400">
              {formatPokemonNumber(previous.id)}
            </span>
            <span className="hidden sm:inline">
              {formatPokemonName(previous.name)}
            </span>
          </Link>
        )}
        {next && (
          <Link href={`/pokemons/${next.id}`} replace className={linkClassName}>
            <span className="hidden sm:inline">
              {formatPokemonName(next.name)}
            </span>
            <span className="text-gray-400">{formatPokemonNumber(next.id)}</span>
            <ChevronIcon />
          </Link>
        )}
      </div>
    </nav>
  );
};
export default PokemonNavigation;
