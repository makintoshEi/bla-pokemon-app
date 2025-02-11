import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "./pokedex.layout";
import PokemonList from "screens/pokemon-list/pokemon-list";
import { debounce } from "lodash";
import { PokemonPagination } from "screens/pokemon-pagination/pokemon-pagination";
import { PokemonSearchBar } from "screens/pokemon-search-bar/pokemon-search-bar";
import PokemonSpinner from "components/spinner/spinner";
import { Message } from "components/message/message";
import { DEBOUNCE_TIME, PAGINATION_LIMIT } from "constants/pokemon.constant";
import { usePokemonList } from "hooks/usePokemonList";

export const Pokedex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(PAGINATION_LIMIT);

  const debouncedSearch = useRef(
    debounce((query: string) => setSearchQuery(query), DEBOUNCE_TIME)
  ).current;

  const {
    data: pokemonsResponse,
    isFetching,
    error,
    refetch,
  } = usePokemonList(offset, limit);

  const filteredPokemons = useMemo(
    () =>
      pokemonsResponse?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [pokemonsResponse, searchQuery]
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

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0);
  };

  useEffect(() => {
    refetch();
  }, [limit]);

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

  if (filteredPokemons?.length === 0) {
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
        limit={limit}
        offset={offset}
        onBack={handleBackNavigation}
        onNext={handleNextPagination}
        searchQueryLength={searchQuery.length}
        totalPokemons={pokemonsResponse?.count}
        onLimitChange={handleLimitChange}
      />
      <PokemonList pokemons={filteredPokemons} />
      <PokemonPagination
        limit={limit}
        offset={offset}
        onBack={handleBackNavigation}
        onNext={handleNextPagination}
        searchQueryLength={searchQuery.length}
        totalPokemons={pokemonsResponse?.count}
        onLimitChange={handleLimitChange}
      />
      {isFetching && <PokemonSpinner size={92} />}
    </Layout>
  );
};
