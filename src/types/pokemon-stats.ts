import { NamedAPIResource } from "./api-resource";

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}
