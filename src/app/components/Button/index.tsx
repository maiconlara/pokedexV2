"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ButtonProps {
  text: string;
}

const ButtonComponent = ({ text }: ButtonProps) => {
  return (
    <Button
      as={Link}
      href={"/pokemons"}
      color="primary"
      variant="flat"
      className="uppercase"
    >
      {text}
    </Button>
  );
};
export default ButtonComponent;
