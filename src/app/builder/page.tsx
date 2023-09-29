"use client";

import { NextUIProvider } from "@nextui-org/react";

const Builder = () => {
  return (
    <>
      <NextUIProvider>
        <main className="flex max-w-screen max-h-screen flex-col items-center justify-center">
          <div className="items-center justify-center flex h-[80vh]">
            <p>Team Builder</p>
          </div>
        </main>
      </NextUIProvider>
    </>
  );
};

export default Builder;
