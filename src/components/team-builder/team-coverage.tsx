"use client";

import { Button, Image, Skeleton } from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { useTeamCoverage } from "@/utils/hooks/useTeamCoverage";
import { TypeCoverage } from "@/utils/typeEffectiveness";
import { formatPokemonName, getArtworkUrl } from "@/utils/pokemonFormat";
import PokemonType from "../pokemon-type";

interface TeamCoverageProps {
  pokemonIds: number[];
}

type CountTone = "weak" | "resistant" | "immune";

const CRITICAL_WEAKNESS_COUNT = 3;

const COUNT_TONES: Record<CountTone, string> = {
  weak: "bg-red-500/20 text-red-200",
  resistant: "bg-green-500/20 text-green-200",
  immune: "bg-sky-500/20 text-sky-200",
};

const COUNT_LABELS: Record<CountTone, [string, string]> = {
  weak: ["fraco", "fracos"],
  resistant: ["resiste", "resistem"],
  immune: ["imune", "imunes"],
};

const rowGridClassName =
  "grid grid-cols-[80px_minmax(0,1fr)_60px_52px] items-center gap-2 sm:grid-cols-[96px_minmax(0,1fr)_72px_64px] sm:gap-3";

const CountBadge = ({ value, tone }: { value: number; tone: CountTone }) => (
  <span
    aria-label={`${value} ${COUNT_LABELS[tone][value === 1 ? 0 : 1]}`}
    className={`inline-flex h-7 min-w-[28px] items-center justify-center justify-self-center rounded-lg px-2 text-sm font-bold ${
      value > 0 ? COUNT_TONES[tone] : "bg-white/5 text-gray-500"
    }`}
  >
    {value}
  </span>
);

const TeamCoverage = ({ pokemonIds }: TeamCoverageProps) => {
  const { t } = useTranslation();
  const { data: pokemons } = useGetPokemons();
  const { coverage, isError, isPending, retry } = useTeamCoverage(pokemonIds);

  const getName = (pokemonId: number) =>
    formatPokemonName(
      pokemons?.find((pokemon) => pokemon.id === pokemonId)?.name ?? ""
    );

  if (pokemonIds.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        Adicione pokémons para ver as fraquezas e resistências do time.
      </p>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-gray-400">
          Não foi possível calcular a cobertura do time agora.
        </p>
        <Button size="sm" color="primary" variant="flat" onPress={retry}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="grid gap-2 lg:grid-cols-2 lg:gap-x-6">
        {Array.from({ length: 10 }, (_, index) => (
          <Skeleton key={index} className="h-11 rounded-xl" />
        ))}
      </div>
    );
  }

  const criticalTypes = coverage
    .filter((item) => item.weakMembers.length >= CRITICAL_WEAKNESS_COUNT)
    .map((item) => t(item.type));
  const criticalList = new Intl.ListFormat("pt-BR", {
    type: "conjunction",
  }).format(criticalTypes);
  const half = Math.ceil(coverage.length / 2);
  const columns = [coverage.slice(0, half), coverage.slice(half)];

  const renderWeakMembers = (item: TypeCoverage) =>
    item.weakMembers.map(({ pokemonId, multiplier }, index) => {
      const name = getName(pokemonId);

      return (
        <span
          key={`${index}-${pokemonId}`}
          title={`${name} (${multiplier}×)`}
          className="relative"
        >
          <Image
            src={getArtworkUrl(pokemonId)}
            alt={`${name}, recebe ${multiplier}× de dano`}
            width={28}
            height={28}
            disableSkeleton
          />
          {multiplier >= 4 && (
            <span className="absolute -bottom-1 -right-1 z-20 rounded bg-red-500 px-0.5 text-[9px] font-bold leading-tight text-white">
              4×
            </span>
          )}
        </span>
      );
    });

  return (
    <div className="flex flex-col gap-4">
      {criticalTypes.length > 0 ? (
        <p
          role="status"
          className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          Cuidado com {criticalList}: {CRITICAL_WEAKNESS_COUNT} ou mais
          pokémons do time são fracos a{" "}
          {criticalTypes.length === 1 ? "esse tipo" : "esses tipos"}.
        </p>
      ) : (
        <p
          role="status"
          className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200"
        >
          Nenhum tipo de ataque pega {CRITICAL_WEAKNESS_COUNT} ou mais pokémons
          do time.
        </p>
      )}

      <div className="grid gap-x-6 gap-y-4 lg:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-1.5">
            <div
              className={`${rowGridClassName} px-3 text-[11px] uppercase text-gray-400 sm:text-xs sm:tracking-wide`}
            >
              <span>Ataque</span>
              <span>Fracos</span>
              <span className="text-center">Resistem</span>
              <span className="text-center">Imunes</span>
            </div>
            {column.map((item) => {
              const isCritical =
                item.weakMembers.length >= CRITICAL_WEAKNESS_COUNT;

              return (
                <div
                  key={item.type}
                  className={`${rowGridClassName} rounded-xl px-3 py-2 ${
                    isCritical
                      ? "bg-red-500/15 ring-1 ring-red-500/50"
                      : "bg-white/5"
                  }`}
                >
                  <div className="text-sm font-medium">
                    <PokemonType type={item.type} />
                  </div>
                  <div className="flex min-w-0 items-center gap-2">
                    <CountBadge value={item.weakMembers.length} tone="weak" />
                    <div className="hidden flex-wrap gap-1 sm:flex">
                      {renderWeakMembers(item)}
                    </div>
                  </div>
                  <CountBadge value={item.resistant} tone="resistant" />
                  <CountBadge value={item.immune} tone="immune" />
                  {item.weakMembers.length > 0 && (
                    <div className="col-span-4 flex flex-wrap gap-1 sm:hidden">
                      {renderWeakMembers(item)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeamCoverage;
