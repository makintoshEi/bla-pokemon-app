import "./main.css";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "./pokedex.layout";
import PokemonSearchBar from "../search-bar/search-bar";
import PokemonList from "../pokemon-list/pokemon-list";
import { PokemonsResponse } from "@/interfaces/pokemon";
import { PokemonModal } from "../pokemon-modal/pokemon-modal";
import { debounce } from "lodash";

export const Pokedex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonsQuery, setPokemonsQuery] = useState("limit=200");
  const debouncedSearch = useRef(
    debounce((query: string) => setSearchQuery(query), 300)
  ).current;

  const {
    data: pokemonResponse,
    isLoading,
    error,
  } = useQuery<PokemonsResponse>({
    queryKey: ["pokemonList", pokemonsQuery],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?${pokemonsQuery}`
      );
      return await response.json();
    },
  });

  const filteredPokemons = useMemo(
    () =>
      pokemonResponse?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [pokemonResponse?.results, searchQuery]
  );

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  if (isLoading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>Error loading Pokemon</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <PokemonSearchBar onSearch={handleSearch} placeholder="Search pokemon" />
      <PokemonList pokemons={filteredPokemons} />
      <PokemonModal />
    </Layout>
  );
};
