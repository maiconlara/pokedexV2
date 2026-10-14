"use client";

import { useMemo, useRef } from "react";
import { Button } from "@nextui-org/react";
import { parseAsInteger, useQueryState } from "nuqs";
import PokemonCard from "./pokemon-card";
import ListPagination from "./list-pagination";
import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { useGetPokemonsType } from "@/utils/hooks/useGetPokemonsType";
import {
  filterPokemons,
  getTotalPages,
  paginate,
} from "@/utils/filterPokemons";

const PAGE_SIZE = 30;

const gridClassName =
  "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:w-[376px] lg:w-[632px] xl:w-[902px] 2xl:w-[1164px]";

const PokemonList = () => {
  const listTopRef = useRef<HTMLDivElement>(null);
  const [type] = useQueryState("type");
  const [query] = useQueryState("query");
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ history: "push" }).withDefault(1)
  );

  const activeType = type && type !== "all" ? type : null;
  const {
    data: pokemons,
    isLoading,
    isError,
    refetch,
  } = useGetPokemons();
  const {
    data: typeIds,
    isLoading: isTypeLoading,
    isError: isTypeError,
    refetch: refetchType,
  } = useGetPokemonsType(activeType);

  const filteredPokemons = useMemo(() => {
    const allPokemons = pokemons ?? [];
    const pokemonsOfType = typeIds
      ? allPokemons.filter((pokemon) => typeIds.has(pokemon.id))
      : allPokemons;

    return filterPokemons(pokemonsOfType, query ?? "");
  }, [pokemons, typeIds, query]);

  const totalPages = getTotalPages(filteredPokemons.length, PAGE_SIZE);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const visiblePokemons = paginate(filteredPokemons, currentPage, PAGE_SIZE);
  const firstItem = (currentPage - 1) * PAGE_SIZE + 1;
  const lastItem = firstItem + visiblePokemons.length - 1;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage === 1 ? null : nextPage);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isError || isTypeError) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center md:w-[376px] lg:w-[632px] xl:w-[902px] 2xl:w-[1164px]">
        <p>Não foi possível carregar os pokémons.</p>
        <Button
          color="primary"
          variant="flat"
          onPress={() => (isError ? refetch() : refetchType())}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (isLoading || isTypeLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: PAGE_SIZE }, (_, index) => (
          <div
            key={index}
            className="h-[160px] rounded-2xl bg-white/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (filteredPokemons.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-center md:w-[376px] lg:w-[632px] xl:w-[902px] 2xl:w-[1164px]">
        <p className="font-bold">Nenhum pokémon encontrado</p>
        <p className="text-sm text-gray-400">
          Tente outro nome, número ou tipo.
        </p>
      </div>
    );
  }

  return (
    <div ref={listTopRef} className="flex flex-col gap-6 scroll-mt-6">
      <p className="text-sm text-gray-400">
        Mostrando {firstItem}–{lastItem} de {filteredPokemons.length} pokémons
      </p>
      <div className={gridClassName}>
        {visiblePokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
        ))}
      </div>
      <div className="flex justify-center">
        <ListPagination
          page={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default PokemonList;
