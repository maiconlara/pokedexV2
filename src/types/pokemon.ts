import { Sprites } from "./pokemon-sprites";
import { Abilities } from "./pokemon-abilities";
import { PokemonStats } from "./pokemon-stats";
import { PokemonTypes } from "./pokemon-types";
import { PokemonMove } from "./pokemon-moves";
import { NamedAPIResource } from "./api-resource";

interface PokemonCries {
  latest: string | null;
  legacy: string | null;
}

export interface Pokemon {
  abilities: Abilities[];
  base_experience: number | null;
  cries: PokemonCries;
  height: number;
  id: number;
  moves: PokemonMove[];
  name: string;
  species: NamedAPIResource;
  sprites: Sprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
  weight: number;
}
