import { NamedAPIResource } from "./api-resource";

export interface Abilities {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}
