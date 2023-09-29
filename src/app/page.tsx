import { Button, NextUIProvider } from "@nextui-org/react";
import { useState } from "react";
import ButtonC from "./components/Button";

export default function Home() {
  return (
      <main className="flex max-w-screen max-h-screen flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-10 h-[80vh]">
          <div>PIKACHU E AMIGOS KKKK</div>
          <div className="flex flex-col items-center justify-center gap-3 mt-20">
            <p>Bem-vindo ao PokeApp!</p>
            <ButtonC />
          </div>
        </div>
      </main>
  );
}
