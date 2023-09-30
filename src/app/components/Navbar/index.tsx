"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import icon from "@/app/icon.png";
import pokemonLogo from "@/app/assets/pokemonLogo.webp"
import {
  Navbar as Nextbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const routes = [
    {
      id: 1,
      text: "Pokémons",
      path: "/pokemons",
    },
    {
      id: 2,
      text: "Inicio",
      path: "/",
    },
    {
      id: 3,
      text: "Team Builder",
      path: "/builder",
    },
  ];

  return (
    <Nextbar position="static" className="bg-[#121326]">
      <NavbarBrand className="gap-3">
        <Image src={pokemonLogo} alt="Pokemin" className="max-w-[100px] max-h-[40px]" />
      </NavbarBrand>
      <NavbarContent className="flex gap-3 sm:gap-4" justify="center">
        {routes.map((item) => (
          <NavbarItem
            key={item.id}
            isActive={pathname === item.path ? true : false}
            className={pathname === item.path ? "pointer-events-none" : ""}
          >
            <Link className="text-white" href={item.path}>
            <Button
              color="primary"
              className={
                pathname === item.path
                  ? "text-bold text-blue-400 font-bold"
                  : " text-white"
              }
              href={item.path}
              variant="light"
            >
              {item.text}
            </Button>
            </Link> 
          </NavbarItem>
        ))}
      </NavbarContent>
    </Nextbar>
  );
};
export default Navbar;
