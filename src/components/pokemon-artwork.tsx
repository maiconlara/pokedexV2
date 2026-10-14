"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { getArtworkUrl } from "@/utils/pokemonFormat";

interface PokemonArtworkProps
  extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  pokemonId: number;
  alt: string;
  size: number;
}

/**
 * Official artwork resized by the Next.js image optimizer and lazy loaded.
 * Falls back to the original PNG when the optimizer fails, for example when
 * the host's free monthly transformation quota runs out.
 *
 * @param pokemonId - National dex number.
 * @param alt - Accessible description, empty when decorative.
 * @param size - Rendered width and height in CSS pixels (128 or less, so it
 *               stays within the widths configured in `next.config.js`).
 */
const PokemonArtwork = ({
  pokemonId,
  alt,
  size,
  ...props
}: PokemonArtworkProps) => {
  const [isOptimized, setIsOptimized] = useState(true);

  return (
    <Image
      src={getArtworkUrl(pokemonId)}
      alt={alt}
      width={size}
      height={size}
      unoptimized={!isOptimized}
      onError={() => setIsOptimized(false)}
      {...props}
    />
  );
};
export default PokemonArtwork;
