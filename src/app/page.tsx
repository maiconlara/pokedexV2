"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <main className="flex max-w-screen max-h-screen flex-col items-center justify-between">
          <div className="items-center justify-center flex h-[80vh]">
            <p>Inicio</p>
          </div>
        </main>
      </NextUIProvider>
    </>
  );
}
