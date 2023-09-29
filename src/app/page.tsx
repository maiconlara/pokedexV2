"use client";

import { Button, NextUIProvider } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <main className="flex max-w-screen max-h-screen flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-10 h-[80vh]">
            <div>PIKACHU E AMIGOS KKKK</div>
            <div className="flex flex-col items-center justify-center gap-3 mt-20">
              <p>Bem-vindo ao PokeApp!</p>
              <Button color="primary" variant="flat" className="uppercase">Começar</Button>
            </div>
          </div>
        </main>
      </NextUIProvider>
    </>
  );
}
