"use client";

import { Skeleton } from "@nextui-org/react";
import { useTypeEffectiveness } from "@/utils/hooks/useTypeEffectiveness";
import PokemonType from "../pokemon-type";

interface PokemonTypeEffectivenessProps {
  types: string[];
}

const GROUPS = [
  { multiplier: 4, label: "Muito fraco", badge: "4×" },
  { multiplier: 2, label: "Fraco", badge: "2×" },
  { multiplier: 0.5, label: "Resistente", badge: "½×" },
  { multiplier: 0.25, label: "Muito resistente", badge: "¼×" },
  { multiplier: 0, label: "Imune", badge: "0×" },
];

const PokemonTypeEffectiveness = ({ types }: PokemonTypeEffectivenessProps) => {
  const { multipliers, isLoading, isError } = useTypeEffectiveness(types);

  if (isError) {
    return (
      <p className="text-sm text-gray-400">
        Não foi possível calcular as fraquezas agora.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-8 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  const groups = GROUPS.map((group) => ({
    ...group,
    types: multipliers
      .filter((item) => item.multiplier === group.multiplier)
      .map((item) => item.type),
  })).filter((group) => group.types.length > 0);

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-sm font-bold">
              {group.badge}
            </span>
            <span className="text-sm text-gray-300">{group.label}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-medium">
            {group.types.map((type) => (
              <div key={type} className="w-[96px]">
                <PokemonType type={type} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default PokemonTypeEffectiveness;
