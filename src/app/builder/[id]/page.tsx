import { notFound } from "next/navigation";
import EditTeam from "@/components/team-builder/edit-team";

interface EditTeamPageProps {
  params: { id: string };
}

const EditTeamPage = ({ params }: EditTeamPageProps) => {
  const id = Number(params.id);

  if (!/^\d+$/.test(params.id) || id < 1) notFound();

  return (
    <main className="flex flex-col max-w-screen items-center md:px-4 lg:px-8 xl:px-10 2xl:px-2">
      <EditTeam key={id} id={id} />
    </main>
  );
};

export default EditTeamPage;
