import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeApp",
  description: "Feito Com 💙 por Maicon Lara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-white text-lg leading-relaxed bg-[#1C1D3A] `}
      >
        <main className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-hidden ">
          <Navbar />
          <div className="flex h-full max-h-screen w-full flex-col bg-cover px-4 ">
            {children}
            
          </div>
          <div className="relative">
              <a href="https://www.github.com/maiconlara" target="_blank" className="absolute right-0 bottom-0 p-2 text-xs hover:text-blue-300 transition-colors ">
                Feito Com 💙 por Maicon Lara
              </a>
            </div>
        </main>
      </body>
    </html>
  );
}
