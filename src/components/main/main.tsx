import "./main.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonList } from "../pokemon-list/pokemon-list";
import { Pokemon } from "@/interfaces/pokemon";

export const Main = () => {
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const {
    data: pokemonList,
    isLoading,
    error,
  } = useQuery<Pokemon[]>({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      console.log("queryiiingggg ... ");
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      return data.results;
    },
  });

  const filteredPokemon = pokemonList?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectedPokemon = (pokemon: string | null) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="main__search"
        aria-label="Search Pokemon"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading Pokemon</p>}
      <PokemonList
        pokemons={filteredPokemon}
        selectPokemon={handleSelectedPokemon}
      />
      {selectedPokemon ? <div>{selectedPokemon}</div> : null}
    </div>
  );
};
