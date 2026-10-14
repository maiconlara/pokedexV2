"use client";

import { useMemo, useState } from "react";
import { Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import { PokemonMove } from "@/types/pokemon-moves";
import { VERSION_GROUPS } from "@/utils/versionGroups";
import { formatSlug } from "@/utils/pokemonFormat";

interface PokemonMovesProps {
  moves: PokemonMove[];
}

interface LearnedMove {
  name: string;
  level: number;
}

const LEARN_METHODS = ["level-up", "machine", "egg", "tutor"];

const groupMovesByMethod = (moves: PokemonMove[], version: string) => {
  const groups = moves.reduce<Record<string, LearnedMove[]>>(
    (result, { move, version_group_details }) => {
      version_group_details
        .filter((detail) => detail.version_group.name === version)
        .forEach((detail) => {
          const method = detail.move_learn_method.name;
          result[method] = [
            ...(result[method] ?? []),
            { name: move.name, level: detail.level_learned_at },
          ];
        });
      return result;
    },
    {}
  );

  return LEARN_METHODS.flatMap((method) => {
    const learnedMoves = groups[method] ?? [];
    if (learnedMoves.length === 0) return [];

    const sortedMoves = [...learnedMoves].sort((a, b) =>
      method === "level-up" && a.level !== b.level
        ? a.level - b.level
        : a.name.localeCompare(b.name)
    );

    return [{ method, moves: sortedMoves }];
  });
};

const formatLevel = (level: number) => (level === 0 ? "Evo." : `Nv. ${level}`);

const PokemonMoves = ({ moves }: PokemonMovesProps) => {
  const { t } = useTranslation();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const availableVersions = useMemo(
    () =>
      VERSION_GROUPS.filter((versionGroup) =>
        moves.some((move) =>
          move.version_group_details.some(
            (detail) => detail.version_group.name === versionGroup.slug
          )
        )
      ),
    [moves]
  );

  const version =
    selectedVersion ?? availableVersions[availableVersions.length - 1]?.slug;

  const movesByMethod = useMemo(
    () => (version ? groupMovesByMethod(moves, version) : []),
    [moves, version]
  );

  if (!version) {
    return (
      <p className="text-sm text-gray-400">
        Não há golpes registrados para este pokémon.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Jogo"
        size="sm"
        disallowEmptySelection
        selectedKeys={[version]}
        onSelectionChange={(keys) => {
          if (keys === "all") return;
          const [nextVersion] = Array.from(keys);
          if (nextVersion) setSelectedVersion(String(nextVersion));
        }}
        className="max-w-[280px]"
        classNames={{ trigger: "bg-white/5 data-[hover=true]:bg-white/10" }}
      >
        {availableVersions.map((versionGroup) => (
          <SelectItem key={versionGroup.slug} value={versionGroup.slug}>
            {versionGroup.label}
          </SelectItem>
        ))}
      </Select>

      <Tabs
        key={version}
        aria-label="Formas de aprender"
        variant="underlined"
        classNames={{ cursor: "bg-blue-400" }}
      >
        {movesByMethod.map(({ method, moves: learnedMoves }) => (
          <Tab
            key={method}
            title={`${t(`moveMethod.${method}`)} (${learnedMoves.length})`}
          >
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {learnedMoves.map((move) => (
                <li
                  key={`${move.name}-${move.level}`}
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm"
                >
                  {method === "level-up" && (
                    <span className="w-12 shrink-0 text-gray-400">
                      {formatLevel(move.level)}
                    </span>
                  )}
                  <span className="font-medium">{formatSlug(move.name)}</span>
                </li>
              ))}
            </ul>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
export default PokemonMoves;
