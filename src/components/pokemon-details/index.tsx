"use client";

import Link from "next/link";
import { isAxiosError } from "axios";
import { Button, Chip, Skeleton } from "@nextui-org/react";
import { useGetPokemonData } from "@/utils/hooks/useGetPokemonData";
import { useGetPokemonSpecies } from "@/utils/hooks/useGetPokemonSpecies";
import {
  formatPokemonName,
  formatPokemonNumber,
  getEnglishFlavorText,
} from "@/utils/pokemonFormat";
import PokemonType from "../pokemon-type";
import AddToTeamButton from "../team-builder/add-to-team-button";
import DetailSection from "./detail-section";
import PokemonHero from "./pokemon-hero";
import PokemonNavigation from "./pokemon-navigation";
import PokemonProfile from "./pokemon-profile";
import PokemonBaseStats from "./pokemon-base-stats";
import PokemonTypeEffectiveness from "./pokemon-type-effectiveness";
import PokemonEvolutionChain from "./pokemon-evolution-chain";
import PokemonMoves from "./pokemon-moves";

interface PokemonDetailsProps {
  id: number;
}

const containerClassName =
  "flex w-full max-w-[1100px] flex-col gap-6 pt-6 pb-12 md:pt-10";

const DetailsSkeleton = () => (
  <div className={containerClassName}>
    <Skeleton className="h-10 w-48 rounded-xl" />
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-[340px] rounded-3xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-10 w-2/3 rounded-lg" />
        <Skeleton className="h-8 w-1/2 rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    </div>
    <Skeleton className="h-[280px] rounded-2xl" />
  </div>
);

const PokemonDetails = ({ id }: PokemonDetailsProps) => {
  const pokemonQuery = useGetPokemonData(id);
  const speciesQuery = useGetPokemonSpecies(id);
  const pokemon = pokemonQuery.data;
  const species = speciesQuery.data;

  if (pokemonQuery.isError || speciesQuery.isError) {
    const error = pokemonQuery.error ?? speciesQuery.error;
    const isNotFound = isAxiosError(error) && error.response?.status === 404;

    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="font-bold text-xl">
          {isNotFound
            ? "Pokémon não encontrado"
            : "Não foi possível carregar este pokémon"}
        </p>
        <div className="flex gap-3">
          {!isNotFound && (
            <Button
              color="primary"
              variant="flat"
              onPress={() => {
                pokemonQuery.refetch();
                speciesQuery.refetch();
              }}
            >
              Tentar novamente
            </Button>
          )}
          <Button as={Link} href="/pokemons" variant="bordered">
            Ver todos os pokémons
          </Button>
        </div>
      </div>
    );
  }

  if (!pokemon || !species) return <DetailsSkeleton />;

  const name = formatPokemonName(species.name);
  const genus = species.genera.find(
    (item) => item.language.name === "en"
  )?.genus;
  const description = getEnglishFlavorText(species.flavor_text_entries);
  const types = pokemon.types.map((item) => item.type.name);
  const badges = [
    species.is_legendary && "Lendário",
    species.is_mythical && "Mítico",
    species.is_baby && "Bebê",
  ].filter((badge): badge is string => Boolean(badge));

  return (
    <div className={containerClassName}>
      <PokemonNavigation id={id} />

      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <PokemonHero pokemon={pokemon} name={name} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-gray-400">{formatPokemonNumber(id)}</p>
            <h1 className="font-bold text-4xl leading-tight">{name}</h1>
            {genus && <p className="text-gray-300">{genus}</p>}
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-medium">
            {types.map((type) => (
              <div key={type} className="w-[110px]">
                <PokemonType type={type} />
              </div>
            ))}
            {badges.map((badge) => (
              <Chip key={badge} variant="flat" color="warning">
                {badge}
              </Chip>
            ))}
          </div>
          {description && (
            <p className="text-base text-gray-200 leading-relaxed">
              {description}
            </p>
          )}
          <AddToTeamButton pokemonId={id} pokemonName={name} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <DetailSection title="Dados">
          <PokemonProfile pokemon={pokemon} species={species} />
        </DetailSection>
        <div className="flex flex-col gap-6">
          <DetailSection title="Status base">
            <PokemonBaseStats stats={pokemon.stats} />
          </DetailSection>
          <DetailSection title="Fraquezas e resistências">
            <PokemonTypeEffectiveness types={types} />
          </DetailSection>
        </div>
      </div>

      <DetailSection title="Linha evolutiva">
        <PokemonEvolutionChain
          chainUrl={species.evolution_chain?.url}
          currentId={id}
        />
      </DetailSection>

      <DetailSection title="Golpes">
        <PokemonMoves moves={pokemon.moves} />
      </DetailSection>
    </div>
  );
};
export default PokemonDetails;
