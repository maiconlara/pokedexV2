import Image from "next/image";
import Link from "next/link";
import background from "@/assets/background.webp";
import backgroundMobile from "@/assets/backgroundMobile.webp";
import PrimaryButton from "@/components/primary-button";
import HomeSearch from "@/components/home/home-search";
import FeatureCard from "@/components/home/feature-card";
import TeamsSummary from "@/components/home/teams-summary";
import {
  DetailsPreview,
  PokedexPreview,
  TeamPreview,
} from "@/components/home/feature-previews";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[1100px] flex-col gap-14 pt-6 pb-16 md:pt-12">
        <section className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="flex justify-center md:order-last">
            <Image
              src={background}
              alt=""
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="hidden h-auto w-full max-w-[560px] md:block"
            />
            <Image
              src={backgroundMobile}
              alt=""
              priority
              sizes="100vw"
              className="block h-auto w-full max-w-[420px] md:hidden"
            />
          </div>

          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-300">
              Pokédex e Team Builder
            </span>
            <h1 className="font-bold text-3xl leading-tight sm:text-4xl md:text-5xl">
              Encontre seus pokémons e monte o time ideal
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-gray-300">
              Pesquise qualquer pokémon, veja status, fraquezas e evoluções de
              cada um e monte times de até 6, salvos no seu navegador.
            </p>
            <HomeSearch />
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <PrimaryButton text="Ver todos os pokémons" href="/pokemons" />
              <Link
                href="/builder"
                className="inline-flex h-10 items-center rounded-xl border-2 border-white/15 px-4 text-sm font-medium uppercase text-gray-200 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Montar um time
              </Link>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-center font-bold text-2xl md:text-left">
            O que dá para fazer aqui
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              href="/pokemons"
              title="Pokédex completa"
              description="Todos os pokémons em ordem de número, com busca por nome ou número e filtro por tipo."
              action="Abrir a Pokédex"
              preview={<PokedexPreview />}
              previewBackground="linear-gradient(135deg, rgba(120, 200, 80, 0.35), rgba(240, 128, 48, 0.35) 50%, rgba(104, 144, 240, 0.35))"
            />
            <FeatureCard
              href="/pokemons/25"
              title="Ficha de cada pokémon"
              description="Clique em qualquer pokémon para ver status, fraquezas, linha evolutiva, habilidades e golpes por jogo."
              action="Ver a ficha do Pikachu"
              preview={<DetailsPreview />}
              previewBackground="linear-gradient(135deg, rgba(202, 169, 37, 0.45), rgba(240, 128, 48, 0.25))"
            />
            <FeatureCard
              href="/builder"
              title="Team Builder"
              description="Monte times de até 6 pokémons, edite quando quiser e veja a quais tipos o seu time é fraco."
              action="Abrir o Team Builder"
              preview={<TeamPreview />}
              previewBackground="linear-gradient(135deg, rgba(112, 88, 152, 0.55), rgba(112, 56, 248, 0.3))"
              footer={<TeamsSummary />}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
