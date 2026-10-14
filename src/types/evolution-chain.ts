import { NamedAPIResource } from "./api-resource";

export interface EvolutionDetail {
  gender: number | null;
  held_item: NamedAPIResource | null;
  is_default?: boolean;
  item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  trigger: NamedAPIResource;
  turn_upside_down: boolean;
}

export interface ChainLink {
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
  species: NamedAPIResource;
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}
