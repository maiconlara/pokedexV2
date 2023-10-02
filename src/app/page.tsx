import ButtonC from "./components/Button";
import background from "./assets/background.webp";
import backgroundMobile from "./assets/backgroundMobile.webp";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex max-w-screen max-h-screen flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-10 h-[80vh]">
          <Image src={background} alt="" className="hidden md:block max-w-[716px] max-h-auto"></Image>
          <Image src={backgroundMobile} alt="" className="block md:hidden max-w-[614px] max-h-auto"></Image>
          <div className="flex flex-col items-center justify-center gap-3">
            <p>Bem-vindo ao PokeApp!</p>
            <ButtonC />
          </div>
        </div>
      </main>
  );
}
