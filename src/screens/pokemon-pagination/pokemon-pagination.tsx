import { useMemo } from "react";
import "./pokemon-pagination.css";

export interface PokemonPaginationProps {
  limit: number;
  offset: number;
  onBack: () => void;
  onNext: () => void;
  searchQueryLength: number;
  totalPokemons: number;
}

export const PokemonPagination = ({
  limit,
  offset,
  onBack,
  onNext,
  searchQueryLength,
  totalPokemons,
}: PokemonPaginationProps) => {
  const paginationDescription = useMemo(
    () =>
      `Pokemons: ${
        offset === 0
          ? `${offset + 1} to ${limit} of ${totalPokemons}`
          : totalPokemons - offset >= limit
          ? `${offset + 1} to ${offset + limit} of ${totalPokemons}`
          : `${offset + 1} to ${totalPokemons}`
      }`,
    [limit, offset, totalPokemons]
  );

  if (searchQueryLength > 0) {
    return null;
  }

  return (
    <div className="pokemon-pagination" aria-atomic="true">
      {offset > 0 ? (
        <a tabIndex={0} role="button" onClick={() => onBack()}>
          &larr;Previous
        </a>
      ) : null}
      {totalPokemons - offset >= limit ? (
        <a tabIndex={0} role="button" onClick={() => onNext()}>
          Next&rarr;
        </a>
      ) : null}
      <p tabIndex={0} aria-live="polite">
        {paginationDescription}
      </p>
    </div>
  );
};
