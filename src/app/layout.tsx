import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const montserratRegular = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-regular",
});
const montserratMedium = Montserrat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-medium",
});
const montserratBold = Montserrat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bold",
});

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
        className={`${inter.className} ${montserratRegular.variable} ${montserratMedium.variable} ${montserratBold.variable} text-white text-lg leading-relaxed bg-[#1C1D3A] `}
      >
        <main className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-hidden ">
          <Navbar />
          <div className="flex h-full max-h-screen w-full flex-col bg-cover px-4 ">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
