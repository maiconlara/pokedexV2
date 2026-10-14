"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
}

const PrimaryButton = ({ text, href = "/pokemons" }: ButtonProps) => {
  return (
    <Button
      as={Link}
      href={href}
      color="primary"
      className="uppercase font-medium"
    >
      {text}
    </Button>
  );
};
export default PrimaryButton;
