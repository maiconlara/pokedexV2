"use client";

import React from "react";

import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/assets/search-icon";

interface SearchInputProps {
  placeHolder: string;
}
const SearchInput = ({ placeHolder }: SearchInputProps) => {
  return (
    <Input
      // onValueChange={(value) => ()}
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