"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { Main } from "@/components/main/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";

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
      <Main />
    </QueryClientProvider>
  );
}
