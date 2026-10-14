"use client";

import { FormEvent, Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "@/assets/search-icon";

const SEARCH_EXAMPLES = ["Pikachu", "Gengar", "150"];

const getSearchUrl = (value: string) => {
  const term = value.trim();
  return term ? `/pokemons?query=${encodeURIComponent(term)}` : "/pokemons";
};

const HomeSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(getSearchUrl(search));
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-2"
    >
      <Input
        value={search}
        onValueChange={setSearch}
        aria-label="Buscar pokémon"
        placeholder="Busque por nome ou número"
        radius="lg"
        startContent={
          <SearchIcon className="text-gray-300 pointer-events-none flex-shrink-0" />
        }
        endContent={
          <Button
            type="submit"
            size="sm"
            color="primary"
            className="font-medium"
          >
            Buscar
          </Button>
        }
        classNames={{
          input: ["text-gray-200", "placeholder:text-gray-500"],
          inputWrapper: [
            "h-12",
            "pr-1.5",
            "shadow-xl",
            "bg-[#121326]",
            "data-[hover=true]:bg-[#16173a]",
            "group-data-[focus=true]:bg-[#16173a]",
          ],
        }}
      />
      <p className="text-sm text-gray-400">
        Experimente:{" "}
        {SEARCH_EXAMPLES.map((example, index) => (
          <Fragment key={example}>
            {index > 0 && ", "}
            <Link
              href={getSearchUrl(example)}
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              {example}
            </Link>
          </Fragment>
        ))}
      </p>
    </form>
  );
};
export default HomeSearch;
