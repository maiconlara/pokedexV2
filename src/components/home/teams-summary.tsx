"use client";

import { useGetTeams } from "@/utils/hooks/useTeams";

const TeamsSummary = () => {
  const { data: teams } = useGetTeams();

  if (!teams || teams.length === 0) return null;

  return (
    <p className="text-sm font-medium text-green-300">
      Você já tem {teams.length}{" "}
      {teams.length === 1 ? "time salvo" : "times salvos"}.
    </p>
  );
};
export default TeamsSummary;
