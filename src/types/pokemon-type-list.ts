import { NamedAPIResource } from "./api-resource";

interface PokemonSlot {
  pokemon: NamedAPIResource;
  slot: number;
}

export interface PokemonList {
  pokemon: PokemonSlot[];
}
