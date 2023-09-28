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
        // #171830 ou #1C1D3A ??
      >
        <main className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-hidden "
         >
          <Navbar />
          <div className="flex h-full max-h-screen w-full flex-col bg-cover px-6 ">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
