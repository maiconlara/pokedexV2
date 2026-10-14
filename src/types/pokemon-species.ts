import { NamedAPIResource } from "./api-resource";

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
}

interface Genus {
  genus: string;
  language: NamedAPIResource;
}

interface APIResource {
  url: string;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  base_happiness: number | null;
  capture_rate: number;
  egg_groups: NamedAPIResource[];
  evolution_chain: APIResource | null;
  flavor_text_entries: FlavorText[];
  gender_rate: number;
  genera: Genus[];
  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;
  hatch_counter: number | null;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
}
