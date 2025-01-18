import "./main.css";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonList } from "../pokemon-list/pokemon-list";
import { Pokemon } from "@/interfaces/pokemon";
import { SearchBar } from "../search-bar/search-bar";
import { Layout } from "./layout";

export const Main = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: pokemonList,
    isLoading,
    error,
  } = useQuery<Pokemon[]>({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      return data.results;
    },
  });

  const filteredPokemons = useMemo(
    () =>
      pokemonList?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [pokemonList, searchQuery]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectedPokemon = (pokemon: string | null) => {
    setSelectedPokemon(pokemon);
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
      <SearchBar onSearch={handleSearch} />
      <PokemonList
        pokemons={filteredPokemons}
        onSelectPokemon={handleSelectedPokemon}
      />
      {selectedPokemon ? <div>{selectedPokemon}</div> : null}
    </Layout>
  );
};
