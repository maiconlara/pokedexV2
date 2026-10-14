"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { TEAM_SIZE } from "@/lib/team-db";
import { Team } from "@/types/team";
import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { formatPokemonName } from "@/utils/pokemonFormat";
import PokemonArtwork from "../pokemon-artwork";

interface TeamCardProps {
  team: Team;
  onDelete: (team: Team) => void;
}

const TeamCard = ({ team, onDelete }: TeamCardProps) => {
  const { data: pokemons } = useGetPokemons();
  const getName = (pokemonId: number) =>
    formatPokemonName(
      pokemons?.find((pokemon) => pokemon.id === pokemonId)?.name ?? ""
    );
  const updatedAt = new Date(team.updatedAt).toLocaleDateString("pt-BR");

  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-[#121326] p-5 shadow-xl">
      <div className="flex flex-col gap-0.5">
        <h2 className="font-bold text-lg leading-tight break-words">
          {team.name}
        </h2>
        <p className="text-xs text-gray-400">
          {team.pokemonIds.length}/{TEAM_SIZE} pokémons · Atualizado em{" "}
          {updatedAt}
        </p>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: TEAM_SIZE }, (_, index) => {
          const pokemonId = team.pokemonIds[index];

          return pokemonId ? (
            <div
              key={`${index}-${pokemonId}`}
              title={getName(pokemonId)}
              className="flex aspect-square items-center justify-center rounded-xl bg-white/5"
            >
              <PokemonArtwork
                pokemonId={pokemonId}
                alt={getName(pokemonId)}
                size={56}
              />
            </div>
          ) : (
            <div
              key={`empty-${index}`}
              className="aspect-square rounded-xl border border-dashed border-white/10"
            />
          );
        })}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          color="danger"
          variant="light"
          onPress={() => onDelete(team)}
        >
          Excluir
        </Button>
        <Button
          as={Link}
          href={`/builder/${team.id}`}
          size="sm"
          color="primary"
          className="font-medium"
        >
          Editar
        </Button>
      </div>
    </article>
  );
};
export default TeamCard;
