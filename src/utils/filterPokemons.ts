import { PokemonEntry } from "@/types/pokemon-list";

const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

/**
 * Filters pokemons by name or by national dex number.
 *
 * @param pokemons - Pokemons to filter.
 * @param search - Name fragment (accents, spaces and symbols are ignored)
 *                 or an exact number, with or without `#`.
 * @returns The matching pokemons, in the original order.
 */
export const filterPokemons = (pokemons: PokemonEntry[], search: string) => {
  const term = search.trim().replace(/^#/, "");

  if (!term) return pokemons;

  if (/^\d+$/.test(term)) {
    return pokemons.filter((pokemon) => pokemon.id === Number(term));
  }

  const normalizedTerm = normalizeSearch(term);

  return pokemons.filter((pokemon) =>
    normalizeSearch(pokemon.name).includes(normalizedTerm)
  );
};

export const getTotalPages = (totalItems: number, pageSize: number) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

export const paginate = <T>(items: T[], page: number, pageSize: number) =>
  items.slice((page - 1) * pageSize, page * pageSize);
