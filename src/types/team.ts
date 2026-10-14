export interface Team {
  id: number;
  name: string;
  pokemonIds: number[];
  createdAt: number;
  updatedAt: number;
}

export type TeamDraft = Pick<Team, "name" | "pokemonIds">;
