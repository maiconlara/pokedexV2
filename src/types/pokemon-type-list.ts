import { NamedAPIResource } from "./api-resource";

interface PokemonSlot {
  pokemon: NamedAPIResource;
  slot: number;
}

export interface TypeDamageRelations {
  double_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
}

export interface PokemonTypeList {
  name: string;
  damage_relations: TypeDamageRelations;
  pokemon: PokemonSlot[];
}
