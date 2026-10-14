"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Skeleton } from "@nextui-org/react";
import { useGetTeam, useUpdateTeam } from "@/utils/hooks/useTeams";
import TeamEditor from "./team-editor";

interface EditTeamProps {
  id: number;
}

const EditTeam = ({ id }: EditTeamProps) => {
  const router = useRouter();
  const { data: team, isPending, isError, refetch } = useGetTeam(id);
  const updateTeam = useUpdateTeam();

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="font-bold text-xl">Não foi possível abrir seus times</p>
        <p className="text-sm text-gray-400">
          Este navegador bloqueou o armazenamento local (IndexedDB).
        </p>
        <Button color="primary" variant="flat" onPress={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex w-full max-w-[1100px] flex-col gap-6 pt-6 pb-12 md:pt-10">
        <Skeleton className="h-10 w-40 rounded-xl" />
        <Skeleton className="h-[360px] rounded-2xl" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="font-bold text-xl">Time não encontrado</p>
        <Button as={Link} href="/builder" color="primary" variant="flat">
          Ver meus times
        </Button>
      </div>
    );
  }

  return (
    <TeamEditor
      title="Editar time"
      initialName={team.name}
      initialPokemonIds={team.pokemonIds}
      isSaving={updateTeam.isPending}
      hasSaveError={updateTeam.isError}
      onSave={(draft) =>
        updateTeam.mutate(
          { ...team, ...draft },
          { onSuccess: () => router.push("/builder") }
        )
      }
    />
  );
};
export default EditTeam;
