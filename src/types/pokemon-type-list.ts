import { NamedAPIResource } from "./api-resource";

interface PokemonSlot {
  pokemon: NamedAPIResource;
  slot: number;
}

export interface PokemonTypeList {
  name: string;
  pokemon: PokemonSlot[];
}
