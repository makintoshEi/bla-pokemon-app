"use client";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Login } from "screens/login/login";

export default function Home() {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/pokedex");
    }
  }, [isLoggedIn, router]);

  return <Login />;
}
