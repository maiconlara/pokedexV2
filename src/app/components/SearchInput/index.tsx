"use client";

import React from "react";

import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

interface SearchInputProps {
  placeHolder: string;
}
const SearchInput = ({ placeHolder }: SearchInputProps) => {
  return (
    <Input
      isClearable
      radius="lg"
      variant="bordered"
      classNames={{
        input: [
          "bg-black",
          "text-gray-200",
          "placeholder:text-gray-600",
          "font-regular",
        ],
        innerWrapper: "bg-transparent gap-2",
        inputWrapper: [
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
