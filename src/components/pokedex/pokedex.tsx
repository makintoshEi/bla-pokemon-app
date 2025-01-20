import { useCallback, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "./pokedex.layout";
import PokemonSearchBar from "components/search-bar/search-bar";
import PokemonList from "components/pokemon-list/pokemon-list";
import { PokemonsResponse } from "interfaces/pokemon";
import { PokemonModal } from "components/pokemon-modal/pokemon-modal";
import { debounce } from "lodash";
import PokemonPaginationButton from "components/button/button";
import { usePokemonContext } from "context/pokemon-context";
import { PokedexSkeleton } from "./skeleton/pokedex.skeleton";
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

  const { isLoading, error } = useQuery<PokemonsResponse>({
    queryKey: ["pokemonList", offset],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      setIsNewRequest(false);
      setPokemons((prev) => [...prev, ...data.results]);
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

  const handleLoadMore = () => {
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

  return (
    <Layout>
      <div className="pokedex__search-bar">
        <PokemonSearchBar
          onSearch={handleSearch}
          placeholder="Search pokemon"
        />
      </div>
      {filteredPokemons.length === 0 ? (
        <Message message="No pokemon matches this search" />
      ) : null}
      <PokemonList pokemons={filteredPokemons} />
      <div className="pokedex__pagination-button">
        <div>
          <PokemonPaginationButton type="button" onClick={handleLoadMore}>
            Load more Pokemon
          </PokemonPaginationButton>
        </div>
      </div>
      <PokemonModal />
    </Layout>
  );
};
