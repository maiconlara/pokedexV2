"use client";

import { useState } from "react";
import { Button, Image } from "@nextui-org/react";
import { Pokemon } from "@/types/pokemon";
import { handlePokemonCardColor } from "@/utils/handlePokemonCardColor";
import { getArtworkUrl } from "@/utils/pokemonFormat";
import { SpeakerIcon } from "@/assets/speaker-icon";
import { SparkleIcon } from "@/assets/sparkle-icon";

interface PokemonHeroProps {
  pokemon: Pokemon;
  name: string;
}

const PokemonHero = ({ pokemon, name }: PokemonHeroProps) => {
  const [isShiny, setIsShiny] = useState(false);

  const artwork = pokemon.sprites.other["official-artwork"];
  const images = [
    {
      isShinyImage: false,
      src: artwork.front_default ?? getArtworkUrl(pokemon.id),
      alt: name,
    },
    {
      isShinyImage: true,
      src: artwork.front_shiny ?? getArtworkUrl(pokemon.id, true),
      alt: `${name} shiny`,
    },
  ];
  const typeColor = handlePokemonCardColor(pokemon.types[0]?.type.name ?? "");
  const cry = pokemon.cries.latest ?? pokemon.cries.legacy;

  const playCry = () => {
    if (!cry) return;
    const audio = new Audio(cry);
    audio.volume = 0.4;
    audio.play().catch(() => undefined);
  };

  return (
    <div
      style={typeColor}
      className="relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-3xl p-6 min-h-[340px] shadow-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.35),transparent_65%)]" />
      <div className="relative z-10 aspect-square w-full max-w-[280px]">
        {images.map((image) => {
          const isVisible = image.isShinyImage === isShiny;

          return (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              removeWrapper
              disableSkeleton
              aria-hidden={!isVisible}
              className={`absolute inset-0 h-full w-full object-contain drop-shadow-2xl transition-opacity duration-300 ${
                isVisible ? "" : "!opacity-0"
              }`}
            />
          );
        })}
      </div>
      <div className="relative z-10 flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          radius="full"
          aria-pressed={isShiny}
          onPress={() => setIsShiny((current) => !current)}
          startContent={<SparkleIcon />}
          className="bg-black/30 text-white font-medium"
        >
          {isShiny ? "Ver normal" : "Ver shiny"}
        </Button>
        {cry && (
          <Button
            size="sm"
            radius="full"
            onPress={playCry}
            startContent={<SpeakerIcon />}
            className="bg-black/30 text-white font-medium"
          >
            Ouvir grito
          </Button>
        )}
      </div>
    </div>
  );
};
export default PokemonHero;
