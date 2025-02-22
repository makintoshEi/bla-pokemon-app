"use client";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect } from "react";
import { Pokedex } from "screens/pokedex/pokedex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonProvider } from "context/pokemon-context";
import { useRouter } from "next/navigation";
import { Logout } from "screens/logout/logout";
import { PokemonModal } from "screens/pokemon-modal/pokemon-modal";

const queryClient = new QueryClient();

export default function MainPokedex() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace("/");
  };

  return (
    <>
      <Logout onLogout={handleLogout} />
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>
          <Pokedex />
          <PokemonModal />
        </PokemonProvider>
      </QueryClientProvider>
    </>
  );
}
