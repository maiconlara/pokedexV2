import { useQueries } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Ability } from "@/types/ability";

const getAbilityRequest = async (name: string) => {
  const { data } = await api.get<Ability>(`/ability/${name}`);
  return data;
};

export const useGetAbilities = (names: string[]) => {
  return useQueries({
    queries: names.map((name) => ({
      queryKey: ["ability", name],
      queryFn: () => getAbilityRequest(name),
    })),
  });
};
