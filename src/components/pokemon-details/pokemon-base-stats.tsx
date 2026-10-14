"use client";

import { useTranslation } from "next-i18next";
import { PokemonStats } from "@/types/pokemon-stats";
import { formatSlug } from "@/utils/pokemonFormat";

interface PokemonBaseStatsProps {
  stats: PokemonStats[];
}

const MAX_BASE_STAT = 255;

const getStatColor = (value: number) => {
  if (value < 50) return "#f34444";
  if (value < 80) return "#ff7f0f";
  if (value < 100) return "#ffdd57";
  if (value < 130) return "#a0e515";
  if (value < 150) return "#23cd5e";
  return "#00c2b8";
};

const PokemonBaseStats = ({ stats }: PokemonBaseStatsProps) => {
  const { t } = useTranslation();
  const total = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div className="flex flex-col gap-3">
      {stats.map((stat) => (
        <div
          key={stat.stat.name}
          className="grid grid-cols-[96px_40px_1fr] items-center gap-3"
        >
          <span className="text-sm text-gray-400">
            {t(`stats.${stat.stat.name}`, {
              defaultValue: formatSlug(stat.stat.name),
            })}
          </span>
          <span className="text-right font-bold text-base">
            {stat.base_stat}
          </span>
          <div
            className="h-2.5 rounded-full bg-white/10 overflow-hidden"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={MAX_BASE_STAT}
            aria-valuenow={stat.base_stat}
            aria-label={stat.stat.name}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(stat.base_stat / MAX_BASE_STAT, 1) * 100}%`,
                backgroundColor: getStatColor(stat.base_stat),
              }}
            />
          </div>
        </div>
      ))}
      <div className="grid grid-cols-[96px_40px_1fr] items-center gap-3 border-t border-white/10 pt-3">
        <span className="text-sm text-gray-400">Total</span>
        <span className="text-right font-bold text-base">{total}</span>
      </div>
    </div>
  );
};
export default PokemonBaseStats;
