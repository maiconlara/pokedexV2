"use client";
// Review this use client to ensure if it's really necessary

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lang";
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
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
};
export default Providers;
