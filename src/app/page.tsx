import PrimaryButton from "@/components/primary-button";
import background from "@/assets/background.webp";
import backgroundMobile from "@/assets/backgroundMobile.webp";
import Image from "next/image";

//TODO: Retornar ao next/image;

export default function Home() {
  const srcBackground = background.src;
  const srcBackgroundMobile = backgroundMobile.src;
  return (
    <main className="flex max-w-screen max-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center gap-10 h-[80vh]">
        
        <img
          src={srcBackground}
          alt=""
          className="hidden md:block max-w-[716px] max-h-auto"
        ></img>
        <img
          src={srcBackgroundMobile}
          alt=""
          className="block md:hidden max-w-[550px] max-h-auto"
        ></img>
        <div className="flex flex-col items-center justify-center gap-3">
          <p>Bem-vindo ao PokeApp!</p>
          <PrimaryButton text="Começar"/>
        </div>
      </div>
    </main>
  );
}
