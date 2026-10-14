import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { EvolutionChain } from "@/types/evolution-chain";
import { getIdFromUrl } from "@/utils/pokemonFormat";

const getEvolutionChainRequest = async (chainId: number) => {
  const { data } = await api.get<EvolutionChain>(`/evolution-chain/${chainId}`);
  return data;
};

export const useGetEvolutionChain = (chainUrl: string | undefined) => {
  const chainId = chainUrl ? getIdFromUrl(chainUrl) : 0;

  return useQuery({
    queryKey: ["evolutionChain", chainId],
    queryFn: () => getEvolutionChainRequest(chainId),
    enabled: chainId > 0,
  });
};
