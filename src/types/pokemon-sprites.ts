interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

interface Other {
  "official-artwork": OfficialArtwork;
}

export interface Sprites {
  other: Other;
}
