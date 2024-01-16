import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Providers from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Pokeapp",
  description: "Feito Com 💙 por Maicon Lara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} ${montserratRegular.variable} ${montserratMedium.variable} ${montserratBold.variable} text-white text-lg leading-relaxed bg-[#1C1D3A] `}
      >
        <Providers>
          <main className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-hidden ">
            <SpeedInsights />
            <Navbar />
            <div className="flex h-full max-h-screen w-full flex-col bg-cover px-4 ">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
