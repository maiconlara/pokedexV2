import { FlavorText } from "@/types/pokemon-species";

const ARTWORK_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const SPECIAL_NAMES: Record<string, string> = {
  "nidoran-f": "Nidoran♀",
  "nidoran-m": "Nidoran♂",
  farfetchd: "Farfetch'd",
  sirfetchd: "Sirfetch'd",
  "mr-mime": "Mr. Mime",
  "mime-jr": "Mime Jr.",
  "mr-rime": "Mr. Rime",
  "ho-oh": "Ho-Oh",
  "porygon-z": "Porygon-Z",
  flabebe: "Flabébé",
  "type-null": "Type: Null",
  "jangmo-o": "Jangmo-o",
  "hakamo-o": "Hakamo-o",
  "kommo-o": "Kommo-o",
  "wo-chien": "Wo-Chien",
  "chien-pao": "Chien-Pao",
  "ting-lu": "Ting-Lu",
  "chi-yu": "Chi-Yu",
};

/**
 * Extracts the numeric id from a PokeAPI resource url.
 *
 * @param url - Resource url, e.g. `https://pokeapi.co/api/v2/pokemon/6/`.
 * @returns The id at the end of the url.
 */
export const getIdFromUrl = (url: string) =>
  Number(url.split("/").filter(Boolean).pop());

export const formatSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatPokemonName = (name: string) =>
  SPECIAL_NAMES[name] ?? formatSlug(name);

export const formatPokemonNumber = (id: number) =>
  `#${id.toString().padStart(3, "0")}`;

export const getArtworkUrl = (id: number, shiny = false) =>
  `${ARTWORK_BASE_URL}/${shiny ? "shiny/" : ""}${id}.png`;

/**
 * Picks the most recent English flavor text and removes the line breaks
 * and soft hyphens that PokeAPI keeps from the game text boxes.
 *
 * @param entries - Flavor texts in every language and game.
 * @returns The cleaned text, or an empty string when there is no English entry.
 */
export const getEnglishFlavorText = (entries: FlavorText[]) => {
  const entry = entries.filter((item) => item.language.name === "en").pop();

  return (entry?.flavor_text ?? "")
    .replace(/­\n/g, "")
    .replace(/[\f\n\r­]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const formatMeasure = (value: number, unit: string) =>
  `${(value / 10).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${unit}`;
