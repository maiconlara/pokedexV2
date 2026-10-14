"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import { SearchIcon } from "@/assets/search-icon";
import { types } from "@/components/types";
import { useGetPokemons } from "@/utils/hooks/useGetPokemons";
import { useGetPokemonsType } from "@/utils/hooks/useGetPokemonsType";
import {
  filterPokemons,
  getTotalPages,
  paginate,
} from "@/utils/filterPokemons";
import {
  formatPokemonName,
  formatPokemonNumber,
  getArtworkUrl,
} from "@/utils/pokemonFormat";
import ListPagination from "../list-pagination";

interface PokemonPickerProps {
  isFull: boolean;
  onSelect: (pokemonId: number) => void;
}

const PAGE_SIZE = 24;

const PokemonPicker = ({ isFull, onSelect }: PokemonPickerProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const activeType = type === "all" ? null : type;
  const { data: pokemons, isLoading, isError, refetch } = useGetPokemons();
  const {
    data: typeIds,
    isLoading: isTypeLoading,
    isError: isTypeError,
  } = useGetPokemonsType(activeType);

  const filteredPokemons = useMemo(() => {
    const allPokemons = pokemons ?? [];
    const pokemonsOfType = typeIds
      ? allPokemons.filter((pokemon) => typeIds.has(pokemon.id))
      : allPokemons;

    return filterPokemons(pokemonsOfType, search);
  }, [pokemons, typeIds, search]);

  const totalPages = getTotalPages(filteredPokemons.length, PAGE_SIZE);
  const currentPage = Math.min(page, totalPages);
  const visiblePokemons = paginate(filteredPokemons, currentPage, PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const renderResults = () => {
    if (isError || isTypeError) {
      return (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p>Não foi possível carregar os pokémons.</p>
          <Button color="primary" variant="flat" onPress={() => refetch()}>
            Tentar novamente
          </Button>
        </div>
      );
    }

    if (isLoading || isTypeLoading) {
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: PAGE_SIZE }, (_, index) => (
            <Skeleton key={index} className="h-[136px] rounded-xl" />
          ))}
        </div>
      );
    }

    if (filteredPokemons.length === 0) {
      return (
        <p className="py-8 text-center text-sm text-gray-400">
          Nenhum pokémon encontrado.
        </p>
      );
    }

    return (
      <>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {visiblePokemons.map((pokemon) => {
            const name = formatPokemonName(pokemon.name);

            return (
              <button
                key={pokemon.id}
                type="button"
                disabled={isFull}
                onClick={() => onSelect(pokemon.id)}
                aria-label={`Adicionar ${name} ao time`}
                className="flex flex-col items-center gap-1 rounded-xl bg-white/5 p-2 pb-3 text-center transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5"
              >
                <Image
                  src={getArtworkUrl(pokemon.id)}
                  alt=""
                  width={72}
                  height={72}
                  disableSkeleton
                />
                <span className="text-xs text-gray-400">
                  {formatPokemonNumber(pokemon.id)}
                </span>
                <span className="font-medium text-sm leading-tight">
                  {name}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center">
          <ListPagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={search}
          onValueChange={handleSearchChange}
          isClearable
          onClear={() => handleSearchChange("")}
          aria-label="Buscar pokémon para o time"
          placeholder="Nome ou número..."
          startContent={<SearchIcon className="text-gray-300 flex-shrink-0" />}
          classNames={{ inputWrapper: "bg-white/5 data-[hover=true]:bg-white/10" }}
        />
        <Select
          aria-label="Filtrar por tipo"
          disallowEmptySelection
          selectedKeys={[type]}
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const [nextType] = Array.from(keys);
            if (!nextType) return;
            setType(String(nextType));
            setPage(1);
          }}
          className="sm:max-w-[200px]"
          classNames={{ trigger: "bg-white/5 data-[hover=true]:bg-white/10" }}
        >
          {types.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {t(item.name)}
            </SelectItem>
          ))}
        </Select>
      </div>
      {isFull && (
        <p className="text-sm text-yellow-300" role="status">
          Seu time está completo. Remova um pokémon para adicionar outro.
        </p>
      )}
      {renderResults()}
    </div>
  );
};
export default PokemonPicker;
