"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "@/app/utils/routes";
import pokemonLogo from "@/app/assets/pokemonLogo.webp";

import {
  Navbar as Nextbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Nextbar
      position="static"
      className="bg-[#121326]"
      onMenuOpenChange={setIsOpen}
      isMenuOpen={isOpen}
      
    >
      <NavbarMenuToggle
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="sm:hidden absolute right-4"
      />
      <NavbarBrand className="gap-3">
        <Image
          src={pokemonLogo}
          alt="Pokemon"
          className="max-w-[100px] max-h-[40px]"
        />
      </NavbarBrand>
      <NavbarContent
        className="hidden md:flex gap-3 sm:gap-5 "
        justify="center"
      >
        {routes.map((item) => (
          <NavbarItem
            key={item.id}
            isActive={pathname === item.path ? true : false}
            className={pathname === item.path ? "pointer-events-none" : ""}
          >
            <Link
              className={
                pathname === item.path
                  ? "text-bold text-blue-400 font-bold min-w-[120px]"
                  : " text-gray-200 font-medium min-w-[120px] hover:text-white"
              }
              href={item.path}
            >
              {item.text}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <MobileMenu pathname={pathname} setIsOpen={setIsOpen} />
    </Nextbar>
  );
};
export default Navbar;
