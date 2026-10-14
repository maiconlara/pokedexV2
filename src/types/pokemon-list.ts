import { NamedAPIResource } from "./api-resource";

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}

export interface PokemonEntry {
  id: number;
  name: string;
}
