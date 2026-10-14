import { types } from "@/components/types";
import { TypeDamageRelations } from "@/types/pokemon-type-list";

export interface TypeMultiplier {
  type: string;
  multiplier: number;
}

export interface TeamMemberRelations {
  pokemonId: number;
  relations: TypeDamageRelations[];
}

export interface WeakMember {
  pokemonId: number;
  multiplier: number;
}

export interface TypeCoverage {
  type: string;
  weakMembers: WeakMember[];
  resistant: number;
  immune: number;
}

const ATTACKING_TYPES = types
  .map((type) => type.name)
  .filter((name) => name !== "all");

const getDamageFactor = (relations: TypeDamageRelations, type: string) => {
  const hasType = (list: { name: string }[]) =>
    list.some((item) => item.name === type);

  if (hasType(relations.no_damage_from)) return 0;
  if (hasType(relations.double_damage_from)) return 2;
  if (hasType(relations.half_damage_from)) return 0.5;
  return 1;
};

/**
 * Calculates how much damage each attacking type deals to a pokemon.
 *
 * @param relations - Damage relations of each of the pokemon's types.
 * @returns One multiplier per attacking type (0, 0.25, 0.5, 1, 2 or 4).
 */
export const getDefensiveMultipliers = (
  relations: TypeDamageRelations[]
): TypeMultiplier[] =>
  ATTACKING_TYPES.map((type) => ({
    type,
    multiplier: relations.reduce(
      (total, relation) => total * getDamageFactor(relation, type),
      1
    ),
  }));

/**
 * Summarizes how a whole team takes damage from each attacking type.
 *
 * @param members - Team members in slot order, with the damage relations
 *                  of each member's types. Repeated pokemons count once per slot.
 * @returns One entry per attacking type with the members that take extra
 *          damage (2× or 4×) and how many resist (½× or ¼×) or are immune (0×).
 */
export const getTeamCoverage = (
  members: TeamMemberRelations[]
): TypeCoverage[] => {
  const membersMultipliers = members.map((member) => ({
    pokemonId: member.pokemonId,
    multipliers: getDefensiveMultipliers(member.relations),
  }));

  return ATTACKING_TYPES.map((type, typeIndex) => {
    const entries = membersMultipliers.map(({ pokemonId, multipliers }) => ({
      pokemonId,
      multiplier: multipliers[typeIndex].multiplier,
    }));

    return {
      type,
      weakMembers: entries.filter((entry) => entry.multiplier > 1),
      resistant: entries.filter(
        (entry) => entry.multiplier > 0 && entry.multiplier < 1
      ).length,
      immune: entries.filter((entry) => entry.multiplier === 0).length,
    };
  });
};
