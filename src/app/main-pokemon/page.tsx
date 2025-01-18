"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/compat/router";
import { useEffect } from "react";
import { Main } from "@/components/main/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function MainPokemon() {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router?.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
