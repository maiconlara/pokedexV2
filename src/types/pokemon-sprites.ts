interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

interface DreamArtwork {
  front_default: string;
}

interface Other {
  "official-artwork": OfficialArtwork;
  dream_world: DreamArtwork;
}

export interface Sprites {
  other: Other;
}
