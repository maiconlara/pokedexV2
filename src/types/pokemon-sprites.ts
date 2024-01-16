interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

interface DreamArtwork {
  front_default: string;
}

interface Other {
  "official-artwork": OfficialArtwork;
}

export interface Sprites {
  front_default: string;

  other: Other;
}
