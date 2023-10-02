"use client";
import React from "react";
import Link from "next/link";
import { routes } from "@/app/utils/routes";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

interface MobileMenuProps {
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ pathname, setIsOpen}: MobileMenuProps) => {
  return (
    <NavbarMenu className="bg-[#121326]/40 gap-5 pt-6">
      {routes.map((item) => (
        <NavbarMenuItem
          key={item.id}
          className={pathname === item.path ? "pointer-events-none" : ""}
        >
          <Link
            className={
              pathname === item.path
                ? "text-bold text-blue-400 font-bold min-w-[120px]"
                : " text-gray-200 font-medium min-w-[120px] hover:text-white"
            }
            href={item.path}
            onClick={() => setIsOpen(false)}
          >
            {item.text}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};
export default MobileMenu;
