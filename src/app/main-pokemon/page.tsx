"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { Pokedex } from "@/components/pokedex/pokedex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { PokemonProvider } from "@/context/pokemon-context";

const queryClient = new QueryClient();

export default function MainPokemon() {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/");
    }
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Pokedex />
      </PokemonProvider>
    </QueryClientProvider>
  );
}
