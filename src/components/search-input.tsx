"use client";

import React, { useState } from "react";

import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/assets/search-icon";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import useDebounce from "@/utils/hooks/useDebounce";

interface SearchInputProps {
  placeHolder: string;
}

const SearchInput = ({ placeHolder }: SearchInputProps) => {
  const [params, setParams] = useQueryStates({
    query: parseAsString,
    page: parseAsInteger,
  });
  const [query, setQuery] = useState(params.query ?? "");

  useDebounce(
    () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery === (params.query ?? "")) return;
      setParams({ query: trimmedQuery || null, page: null });
    },
    500,
    [query]
  );

  return (
    <Input
      value={query}
      onValueChange={setQuery}
      isClearable
      onClear={() => setQuery("")}
      aria-label="Buscar pokémon"
      radius="lg"
      variant="bordered"
      className="w-full"
      classNames={{
        input: [
          "text-gray-200",
          "placeholder:text-gray-600",
          "font-regular, w-full",
        ],
        innerWrapper: "bg-transparent gap-2",
        inputWrapper: [
          "w-full",
          "max-h-[40px]",
          "shadow-xl",
          "bg-[#121326]",
          "!cursor-text",
          "border-none",
        ],
      }}
      placeholder={placeHolder}
      startContent={
        <SearchIcon className="text-gray-300 pointer-events-none flex-shrink-0" />
      }
    />
  );
};
export default SearchInput;
