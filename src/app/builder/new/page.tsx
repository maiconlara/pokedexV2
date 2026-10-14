import { Suspense } from "react";
import NewTeam from "@/components/team-builder/new-team";

const NewTeamPage = () => {
  return (
    <main className="flex flex-col max-w-screen items-center md:px-4 lg:px-8 xl:px-10 2xl:px-2">
      <Suspense>
        <NewTeam />
      </Suspense>
    </main>
  );
};

export default NewTeamPage;
