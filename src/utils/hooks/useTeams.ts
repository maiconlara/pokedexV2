import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeam,
  deleteTeam,
  getTeam,
  listTeams,
  updateTeam,
} from "@/lib/team-db";

const TEAMS_KEY = ["teams"];

export const useGetTeams = () => {
  return useQuery({
    queryKey: TEAMS_KEY,
    queryFn: listTeams,
  });
};

export const useGetTeam = (id: number) => {
  return useQuery({
    queryKey: [...TEAMS_KEY, id],
    queryFn: () => getTeam(id),
  });
};

const useTeamMutation = <TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TEAMS_KEY }),
  });
};

export const useCreateTeam = () => useTeamMutation(createTeam);

export const useUpdateTeam = () => useTeamMutation(updateTeam);

export const useDeleteTeam = () => useTeamMutation(deleteTeam);
