"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import pokemonLogo from "@/app/assets/pokemonLogo.webp";

import {
  Navbar as Nextbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <Nextbar
      position="static"
      className="bg-[#121326]"
      onMenuOpenChange={setIsOpen}
    >
      <NavbarMenuToggle
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="sm:hidden absolute right-4"
      />
      <NavbarBrand className="gap-3">
        <Image
          src={pokemonLogo}
          alt="Pokemin"
          className="max-w-[100px] max-h-[40px]"
        />
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-3 sm:gap-4 " justify="center">
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
                    ? "text-bold text-blue-400 font-bold min-w-[120px]"
                    : " text-gray-200 font-medium min-w-[120px]"
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
      <NavbarMenu className="bg-[#121326]/40">
        {routes.map((item) => (
          <NavbarMenuItem
            key={item.id}
            className={pathname === item.path ? "pointer-events-none" : ""}
          >
            <Link className="text-white" href={item.path}>
              <Button
                color="primary"
                className={
                  pathname === item.path
                    ? "text-bold text-blue-400 font-bold w-full flex justify-start"
                    : " text-gray-200 w-full font-medium  flex justify-start"
                }
                href={item.path}
                variant="light"
              >
                {item.text}
              </Button>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Nextbar>
  );
};
export default Navbar;
