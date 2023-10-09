"use client";

import { Button } from "@nextui-org/react";

interface SearchButtonProps {
  handlePokemonSearch: () => void;
}

const SearchButton = ({handlePokemonSearch}: SearchButtonProps) => {
  return (
      <Button onClick={handlePokemonSearch} color="primary" variant="flat" className="uppercase max-w-[60px]">
        GO!
      </Button>
  );
};
export default SearchButton;
