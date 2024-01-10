"use client";
// Review this use client to ensure if it's really necessary


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const MINUTE = 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 20 * MINUTE,
      staleTime: Infinity,
      retry: false,
    },
  },
});

const Providers = ({ children }: ProvidersProps) => {
    return (

        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
};
export default Providers;
