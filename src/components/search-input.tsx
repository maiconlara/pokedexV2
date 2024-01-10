"use client";

import React, { useState } from "react";

import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/assets/search-icon";
import { useQueryState } from "nuqs";
import useDebounce from "@/utils/hooks/useDebounce";

interface SearchInputProps {
  placeHolder: string;
}

const SearchInput = ({ placeHolder }: SearchInputProps) => {
  const setQueryParam = useQueryState("query")[1];
  const [query, setQuery] = useState("");
  const searchLengthRule = query.length > 0 && query.length < 3;

  useDebounce(
    () => {
      if (searchLengthRule) return;
      setQueryParam(query);
    },
    1500,
    [query]
  );

  return (
    <Input
      onValueChange={(value) => setQuery(value)}
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
