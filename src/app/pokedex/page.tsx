"use client";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect } from "react";
import { Pokedex } from "components/pokedex/pokedex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonProvider } from "context/pokemon-context";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export default function MainPokedex() {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Pokedex />
      </PokemonProvider>
    </QueryClientProvider>
  );
}
