"use client";
import React from "react";
import Link from "next/link";
import { routes } from "@/app/utils/routes";
import { Button, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

interface MobileMenuProps {
  pathname: string;
}

const MobileMenu = ({ pathname }: MobileMenuProps) => {
  return (
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
  );
};
export default MobileMenu;
