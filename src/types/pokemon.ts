import { Sprites } from "./pokemon-sprites";
import { Abilities } from "./pokemon-abilities";
import { PokemonStats } from "./pokemon-stats";
import { PokemonTypes } from "./pokemon-types";

export interface Pokemon {
  abilities: Abilities[];
  id: number;
  name: string;
  sprites: Sprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
  weight: number;
}
