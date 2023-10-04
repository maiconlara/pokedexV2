"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

const ButtonComponent = () => {
  return (
      <Button as={Link} href={"/pokemons"} color="primary" variant="flat" className="uppercase">
        Começar
      </Button>
  );
};
export default ButtonComponent;
