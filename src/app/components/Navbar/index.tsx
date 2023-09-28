"use client";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Navbar as Nextbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

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
    <Nextbar position="static" className="bg-transparent">
      <NavbarBrand>
        <p className="font-bold text-inherit">PKMN</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6 " justify="center">
        {routes.map((item) => (
          <NavbarItem
            key={item.id}
            isActive={pathname === item.path ? true : false}
          >
            <Link className="text-white" href={item.path}>
              {item.text}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Nextbar>
  );
};
export default Navbar;
