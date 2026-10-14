"use client";

import { Chip, Skeleton } from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import { Pokemon } from "@/types/pokemon";
import { PokemonSpecies } from "@/types/pokemon-species";
import { useGetAbilities } from "@/utils/hooks/useGetAbilities";
import {
  formatMeasure,
  formatSlug,
  getEnglishFlavorText,
} from "@/utils/pokemonFormat";

interface PokemonProfileProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

const formatPercent = (value: number) =>
  `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;

const formatGender = (genderRate: number) => {
  if (genderRate < 0) return "Sem gênero";
  const female = (genderRate / 8) * 100;
  return `${formatPercent(100 - female)} ♂ · ${formatPercent(female)} ♀`;
};

const formatGeneration = (generation: string) =>
  generation.replace("generation-", "").toUpperCase();

const PokemonProfile = ({ pokemon, species }: PokemonProfileProps) => {
  const { t } = useTranslation();
  const abilities = useGetAbilities(
    pokemon.abilities.map((item) => item.ability.name)
  );

  const rows = [
    { label: "Altura", value: formatMeasure(pokemon.height, "m") },
    { label: "Peso", value: formatMeasure(pokemon.weight, "kg") },
    { label: "Geração", value: formatGeneration(species.generation.name) },
    { label: "Gênero", value: formatGender(species.gender_rate) },
    { label: "Taxa de captura", value: species.capture_rate },
    { label: "Felicidade base", value: species.base_happiness ?? "–" },
    { label: "Experiência base", value: pokemon.base_experience ?? "–" },
    {
      label: "Crescimento",
      value: t(`growthRate.${species.growth_rate.name}`, {
        defaultValue: formatSlug(species.growth_rate.name),
      }),
    },
    {
      label: "Grupos de ovo",
      value: species.egg_groups
        .map((group) =>
          t(`eggGroup.${group.name}`, { defaultValue: formatSlug(group.name) })
        )
        .join(", "),
    },
    { label: "Ciclos de ovo", value: species.hatch_counter ?? "–" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-0.5">
            <dt className="text-xs uppercase tracking-wide text-gray-400">
              {row.label}
            </dt>
            <dd className="font-medium text-base">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs uppercase tracking-wide text-gray-400">
          Habilidades
        </h3>
        <ul className="flex flex-col gap-3">
          {pokemon.abilities.map((item, index) => {
            const ability = abilities[index];
            const description = ability?.data
              ? getEnglishFlavorText(ability.data.flavor_text_entries)
              : "";

            return (
              <li
                key={item.ability.name}
                className="flex flex-col gap-1 rounded-xl bg-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium text-base">
                    {formatSlug(item.ability.name)}
                  </p>
                  {item.is_hidden && (
                    <Chip size="sm" variant="flat" color="secondary">
                      Oculta
                    </Chip>
                  )}
                </div>
                {ability?.isPending ? (
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                ) : (
                  description && (
                    <p className="text-sm text-gray-400 leading-snug">
                      {description}
                    </p>
                  )
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default PokemonProfile;
