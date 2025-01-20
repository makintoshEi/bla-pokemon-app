import { useCallback, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "./pokedex.layout";
import PokemonList from "screens/pokemon-list/pokemon-list";
import { PokemonsResponse } from "interfaces/pokemon";
import { PokemonModal } from "screens/pokemon-modal/pokemon-modal";
import { debounce } from "lodash";
import { usePokemonContext } from "context/pokemon-context";
import { PokedexSkeleton } from "./skeleton/pokedex.skeleton";
import { PokemonPagination } from "screens/pokemon-pagination/pokemon-pagination";
import { PokemonSearchBar } from "./pokemon-search-bar/pokemon-search-bar";
import { Message } from "components/message/message";

export const Pokedex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [isNewRequest, setIsNewRequest] = useState(true);
  const limit = 100;

  const debouncedSearch = useRef(
    debounce((query: string) => setSearchQuery(query), 300)
  ).current;

  const { pokemons, setPokemons } = usePokemonContext();

  const {
    data: pokemonsResponse,
    isLoading,
    error,
  } = useQuery<PokemonsResponse>({
    queryKey: ["pokemonList", offset],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      setIsNewRequest(false);
      setPokemons(data.results);
      return data;
    },
    enabled: isNewRequest,
  });

  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [pokemons, searchQuery]
  );

  const handleSearch = useCallback(
    (query: string) => {
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  const handleBackNavigation = () => {
    setIsNewRequest(true);
    setOffset((prev) => prev - limit);
  };

  const handleNextPagination = () => {
    setIsNewRequest(true);
    setOffset((prev) => prev + limit);
  };

  if (isLoading) {
    return <PokedexSkeleton cardCount={12} />;
  }

  if (error) {
    return (
      <Layout>
        <Message message="Error loading pokemons" variant="error" />
      </Layout>
    );
  }

  if (pokemons.length > 0 && filteredPokemons.length === 0) {
    return (
      <Layout>
        <PokemonSearchBar onSearch={handleSearch} />
        <Message message="No pokemon matches this search" />
      </Layout>
    );
  }

  return (
    <Layout>
      <PokemonSearchBar onSearch={handleSearch} />
      {searchQuery.length === 0 ? (
        <PokemonPagination
          offset={offset}
          onBack={handleBackNavigation}
          onNext={handleNextPagination}
          totalPokemons={pokemonsResponse?.count || 0}
        />
      ) : null}
      <PokemonList pokemons={filteredPokemons} />
      <PokemonModal />
    </Layout>
  );
};
