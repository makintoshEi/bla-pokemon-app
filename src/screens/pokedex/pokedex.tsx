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
import { DEBOUNCE_TIME, PAGINATION_LIMIT } from "constants/pokemon.constant";
import { getPokemons } from "api/pokemon.api";

export const Pokedex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = PAGINATION_LIMIT;

  const debouncedSearch = useRef(
    debounce((query: string) => setSearchQuery(query), DEBOUNCE_TIME)
  ).current;

  const { pokemons, setPokemons } = usePokemonContext();
 
  const {
    data: pokemonsResponse,
    isLoading,
    error,
  } = useQuery<PokemonsResponse>({
    queryKey: ["pokemonList", offset],
    queryFn: async () => {
      const response = await getPokemons(offset, limit);
      setPokemons(response.results);
      return response;
    },
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
    setOffset((prev) => prev - limit);
  };

  const handleNextPagination = () => {
    setOffset((prev) => prev + limit);
  };

  if (isLoading) {
    return <PokedexSkeleton cardCount={12} />;
  }

  if (error) {
    return (
      <Layout>
        <Message
          message="Error loading pokemons, refresh the page"
          variant="error"
        />
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
      <PokemonPagination
        offset={offset}
        onBack={handleBackNavigation}
        onNext={handleNextPagination}
        searchQueryLength={searchQuery.length}
        totalPokemons={pokemonsResponse?.count || 0}
      />
      <PokemonList pokemons={filteredPokemons} />
      <PokemonPagination
        offset={offset}
        onBack={handleBackNavigation}
        onNext={handleNextPagination}
        searchQueryLength={searchQuery.length}
        totalPokemons={pokemonsResponse?.count || 0}
      />
      <PokemonModal />
    </Layout>
  );
};
