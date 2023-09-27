"use client";

import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";


export default function Home() {
  return (
    <>
      <NextUIProvider>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Button color="warning" className="text-white" isLoading>Carregando</Button>
        </main>
      </NextUIProvider>
    </>
  );
}
