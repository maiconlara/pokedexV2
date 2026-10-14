interface OfficialArtwork {
  front_default: string | null;
  front_shiny: string | null;
}

interface Other {
  "official-artwork": OfficialArtwork;
}

export interface Sprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other: Other;
}
