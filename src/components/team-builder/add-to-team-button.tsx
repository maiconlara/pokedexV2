"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { TEAM_SIZE } from "@/lib/team-db";
import { useGetTeams, useUpdateTeam } from "@/utils/hooks/useTeams";

interface AddToTeamButtonProps {
  pokemonId: number;
  pokemonName: string;
}

const NEW_TEAM_KEY = "new";

const AddToTeamButton = ({ pokemonId, pokemonName }: AddToTeamButtonProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: teams = [], isLoading, isError } = useGetTeams();
  const updateTeam = useUpdateTeam();

  const fullTeamKeys = teams
    .filter((team) => team.pokemonIds.length >= TEAM_SIZE)
    .map((team) => String(team.id));

  const items = [
    ...teams.map((team, index) => ({
      key: String(team.id),
      label: team.name,
      description:
        team.pokemonIds.length >= TEAM_SIZE
          ? "Time completo"
          : `${team.pokemonIds.length}/${TEAM_SIZE} pokémons`,
      showDivider: index === teams.length - 1,
    })),
    {
      key: NEW_TEAM_KEY,
      label: "Criar novo time",
      description: `Começar um time com ${pokemonName}`,
      showDivider: false,
    },
  ];

  const handleSelect = (key: string) => {
    setIsOpen(false);

    if (key === NEW_TEAM_KEY) {
      router.push(`/builder/new?pokemon=${pokemonId}`);
      return;
    }

    const team = teams.find((item) => String(item.id) === key);
    if (!team || team.pokemonIds.length >= TEAM_SIZE) return;

    updateTeam.mutate({
      ...team,
      pokemonIds: [...team.pokemonIds, pokemonId],
    });
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Dropdown
        placement="bottom-start"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <DropdownTrigger>
          <Button
            color="primary"
            className="uppercase font-medium"
            isLoading={isLoading || updateTeam.isPending}
            isDisabled={isError}
          >
            Adicionar ao time
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Escolha o time"
          items={items}
          disabledKeys={fullTeamKeys}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              description={item.description}
              showDivider={item.showDivider}
              onPress={() => handleSelect(item.key)}
              className={item.key === NEW_TEAM_KEY ? "text-primary" : ""}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {updateTeam.isSuccess && (
        <p className="text-sm text-green-400" role="status">
          {pokemonName} entrou em &quot;{updateTeam.variables.name}&quot;.
        </p>
      )}
      {(updateTeam.isError || isError) && (
        <p className="text-sm text-red-400" role="alert">
          Não foi possível acessar seus times neste navegador.
        </p>
      )}
    </div>
  );
};
export default AddToTeamButton;
