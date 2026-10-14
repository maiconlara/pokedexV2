"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Skeleton } from "@nextui-org/react";
import { Team } from "@/types/team";
import { useDeleteTeam, useGetTeams } from "@/utils/hooks/useTeams";
import TeamCard from "./team-card";
import DeleteTeamModal from "./delete-team-modal";

const TeamList = () => {
  const { data: teams, isPending, isError, refetch } = useGetTeams();
  const deleteTeam = useDeleteTeam();
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  const closeDeleteModal = () => {
    setTeamToDelete(null);
    deleteTeam.reset();
  };

  const renderContent = () => {
    if (isError) {
      return (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="font-bold">Não foi possível abrir seus times</p>
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-[220px] rounded-2xl" />
          ))}
        </div>
      );
    }

    if (teams.length === 0) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-white/10 px-6 py-16 text-center">
          <p className="font-bold text-lg">Você ainda não tem times</p>
          <p className="max-w-md text-sm text-gray-400">
            Monte seu primeiro time com até 6 pokémons. Ele fica salvo neste
            navegador e você pode editar quando quiser.
          </p>
          <Button
            as={Link}
            href="/builder/new"
            color="primary"
            className="font-medium"
          >
            Criar primeiro time
          </Button>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} onDelete={setTeamToDelete} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex w-full max-w-[1100px] flex-col gap-6 pt-6 pb-12 md:pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-3xl">Meus times</h1>
          <p className="text-sm text-gray-400">
            Times de até 6 pokémons, salvos neste navegador.
          </p>
        </div>
        {teams && teams.length > 0 && (
          <Button
            as={Link}
            href="/builder/new"
            color="primary"
            className="font-medium"
          >
            Novo time
          </Button>
        )}
      </div>

      {renderContent()}

      <DeleteTeamModal
        team={teamToDelete}
        isDeleting={deleteTeam.isPending}
        hasError={deleteTeam.isError}
        onCancel={closeDeleteModal}
        onConfirm={(team) =>
          deleteTeam.mutate(team.id, { onSuccess: closeDeleteModal })
        }
      />
    </div>
  );
};
export default TeamList;
