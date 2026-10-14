import { ChainLink, EvolutionDetail } from "@/types/evolution-chain";
import { getIdFromUrl } from "./pokemonFormat";

export interface EvolutionStage {
  id: number;
  name: string;
  detail: EvolutionDetail | null;
}

const pickDetail = (details: EvolutionDetail[]) =>
  details.find((detail) => detail.is_default) ??
  details[details.length - 1] ??
  null;

/**
 * Flattens an evolution chain into stages, keeping branches side by side.
 * Eevee, for example, becomes `[[eevee], [vaporeon, jolteon, ...]]`.
 *
 * @param chain - Root link of the evolution chain.
 * @returns One array per stage, each pokemon with the condition used to reach it.
 */
export const getEvolutionStages = (chain: ChainLink) => {
  const stages: EvolutionStage[][] = [];

  const visit = (link: ChainLink, depth: number) => {
    stages[depth] = [
      ...(stages[depth] ?? []),
      {
        id: getIdFromUrl(link.species.url),
        name: link.species.name,
        detail: pickDetail(link.evolution_details),
      },
    ];
    link.evolves_to.forEach((next) => visit(next, depth + 1));
  };

  visit(chain, 0);

  return stages;
};
