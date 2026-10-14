import { FlavorText } from "./pokemon-species";

export interface Ability {
  id: number;
  name: string;
  flavor_text_entries: FlavorText[];
}
