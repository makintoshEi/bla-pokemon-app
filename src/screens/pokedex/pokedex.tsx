import { useMemo, useRef, useState } from "react";
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
  } = usePokemonList(offset, limit);

  const lowerSearchQuery = useMemo(
    () => searchQuery.toLowerCase(),
    [searchQuery]
  );

  const filteredPokemons = useMemo(
    () =>
      pokemonsResponse?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerSearchQuery)
      ),
    [pokemonsResponse, lowerSearchQuery]
  );

  const handleSearch = (query: string) => debouncedSearch(query);

  const handleBackNavigation = () => {
    setOffset((prev) => {
      const newOffset = prev - limit;
      return newOffset < 0 ? 0 : newOffset;
    });
  };

  const handleNextPagination = () => {
    setOffset((prev) => {
      const newOffset = prev + limit;
      return newOffset > pokemonsResponse!.count
        ? pokemonsResponse!.count
        : newOffset;
    });
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

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

  const showPagination = searchQuery.length === 0;

  const paginationProps = {
    limit,
    offset,
    onBack: handleBackNavigation,
    onNext: handleNextPagination,
    totalPokemons: pokemonsResponse?.count,
    onLimitChange: handleLimitChange,
  };

  return (
    <Layout>
      <PokemonSearchBar onSearch={handleSearch} />
      {showPagination && <PokemonPagination {...paginationProps} />}
      <PokemonList pokemons={filteredPokemons} />
      {showPagination && <PokemonPagination {...paginationProps} />}
      {isFetching && <PokemonSpinner size={92} />}
    </Layout>
  );
};
