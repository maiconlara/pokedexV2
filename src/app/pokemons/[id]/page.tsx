import { notFound } from "next/navigation";
import PokemonDetails from "@/components/pokemon-details";

interface PokemonPageProps {
  params: { id: string };
}

const PokemonPage = ({ params }: PokemonPageProps) => {
  const id = Number(params.id);

  if (!/^\d+$/.test(params.id) || id < 1) notFound();

  return (
    <main className="flex flex-col max-w-screen items-center md:px-4 lg:px-8 xl:px-10 2xl:px-2">
      <PokemonDetails key={id} id={id} />
    </main>
  );
};
export default PokemonPage;
