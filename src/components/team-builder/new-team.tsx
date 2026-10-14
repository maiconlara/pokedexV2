"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_TEAM_NAME } from "@/lib/team-db";
import { useCreateTeam } from "@/utils/hooks/useTeams";
import TeamEditor from "./team-editor";

const NewTeam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createTeam = useCreateTeam();

  const initialPokemon = Number(searchParams.get("pokemon"));
  const initialPokemonIds =
    Number.isInteger(initialPokemon) && initialPokemon > 0
      ? [initialPokemon]
      : [];

  return (
    <TeamEditor
      title="Novo time"
      initialName={DEFAULT_TEAM_NAME}
      initialPokemonIds={initialPokemonIds}
      isSaving={createTeam.isPending}
      hasSaveError={createTeam.isError}
      onSave={(draft) =>
        createTeam.mutate(draft, { onSuccess: () => router.push("/builder") })
      }
    />
  );
};
export default NewTeam;
