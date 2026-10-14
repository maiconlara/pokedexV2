"use client";

import { Fragment, useMemo } from "react";
import Link from "next/link";
import { Image, Skeleton } from "@nextui-org/react";
import { TFunction } from "i18next";
import { useTranslation } from "next-i18next";
import { EvolutionDetail } from "@/types/evolution-chain";
import { useGetEvolutionChain } from "@/utils/hooks/useGetEvolutionChain";
import { getEvolutionStages } from "@/utils/evolutionChain";
import {
  formatPokemonName,
  formatPokemonNumber,
  formatSlug,
  getArtworkUrl,
} from "@/utils/pokemonFormat";
import { ChevronIcon } from "@/assets/chevron-icon";

interface PokemonEvolutionChainProps {
  chainUrl: string | undefined;
  currentId: number;
}

const TRIGGER_LABELS: Record<string, string> = {
  "level-up": "Subir de nível",
  trade: "Troca",
  "use-item": "Usar item",
  shed: "Vaga livre na equipe",
  spin: "Girar com o pokémon",
  other: "Condição especial",
};

const TIME_OF_DAY_LABELS: Record<string, string> = {
  day: "De dia",
  night: "À noite",
  dusk: "Ao entardecer",
};

const describeEvolution = (detail: EvolutionDetail, t: TFunction) => {
  const conditions = [
    detail.trigger.name === "trade" && "Troca",
    detail.item && `Usar ${formatSlug(detail.item.name)}`,
    detail.min_level && `Nível ${detail.min_level}`,
    detail.min_happiness && "Amizade alta",
    detail.min_affection && "Afeição alta",
    detail.min_beauty && "Beleza alta",
    detail.held_item && `Segurando ${formatSlug(detail.held_item.name)}`,
    detail.known_move && `Sabendo ${formatSlug(detail.known_move.name)}`,
    detail.known_move_type &&
      `Golpe do tipo ${t(detail.known_move_type.name)}`,
    detail.location && `Em ${formatSlug(detail.location.name)}`,
    TIME_OF_DAY_LABELS[detail.time_of_day],
    detail.gender === 1 && "Fêmea",
    detail.gender === 2 && "Macho",
    detail.needs_overworld_rain && "Com chuva",
    detail.party_species &&
      `Com ${formatPokemonName(detail.party_species.name)} na equipe`,
    detail.party_type && `Com tipo ${t(detail.party_type.name)} na equipe`,
    detail.trade_species &&
      `Por ${formatPokemonName(detail.trade_species.name)}`,
    detail.turn_upside_down && "Console de cabeça para baixo",
  ].filter((condition): condition is string => Boolean(condition));

  if (conditions.length > 0) return conditions.join(" · ");

  return TRIGGER_LABELS[detail.trigger.name] ?? formatSlug(detail.trigger.name);
};

const PokemonEvolutionChain = ({
  chainUrl,
  currentId,
}: PokemonEvolutionChainProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetEvolutionChain(chainUrl);
  const stages = useMemo(
    () => (data ? getEvolutionStages(data.chain) : []),
    [data]
  );

  if (isError) {
    return (
      <p className="text-sm text-gray-400">
        Não foi possível carregar a linha evolutiva.
      </p>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-[180px] w-full rounded-xl" />;
  }

  if (stages.length <= 1) {
    return <p className="text-sm text-gray-400">Este pokémon não evolui.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
      {stages.map((stage, index) => (
        <Fragment key={stage.map((pokemon) => pokemon.id).join("-")}>
          {index > 0 && (
            <ChevronIcon className="shrink-0 rotate-90 text-2xl text-gray-500 md:rotate-0" />
          )}
          <div className="flex flex-wrap justify-center gap-3">
            {stage.map((pokemon) => {
              const isCurrent = pokemon.id === currentId;
              const pokemonName = formatPokemonName(pokemon.name);

              return (
                <Link
                  key={pokemon.id}
                  href={`/pokemons/${pokemon.id}`}
                  replace
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex w-[132px] flex-col items-center gap-1 rounded-2xl p-3 text-center transition-colors hover:bg-white/10 ${
                    isCurrent ? "bg-white/10 ring-2 ring-blue-400" : "bg-white/5"
                  }`}
                >
                  <Image
                    src={getArtworkUrl(pokemon.id)}
                    alt={pokemonName}
                    width={88}
                    height={88}
                    disableSkeleton
                  />
                  <span className="text-xs text-gray-400">
                    {formatPokemonNumber(pokemon.id)}
                  </span>
                  <span className="font-medium text-sm">{pokemonName}</span>
                  {pokemon.detail && (
                    <span className="text-xs text-gray-400 leading-snug">
                      {describeEvolution(pokemon.detail, t)}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
export default PokemonEvolutionChain;
