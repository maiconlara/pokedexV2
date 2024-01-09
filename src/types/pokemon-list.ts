import { NamedAPIResource } from "./api-resource";

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}
