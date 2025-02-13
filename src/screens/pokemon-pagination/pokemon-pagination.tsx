import { useMemo } from "react";
import "./pokemon-pagination.css";
import { LIMITS } from "constants/pokemon.constant";
import PaginationSelect from "components/select/select";

export interface PokemonPaginationProps {
  limit: number;
  offset: number;
  onBack: () => void;
  onNext: () => void;
  totalPokemons: number | undefined;
  onLimitChange: (newLimit: number) => void;
}

export const PokemonPagination = ({
  limit,
  offset,
  onBack,
  onNext,
  totalPokemons = 0,
  onLimitChange,
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
  return (
    <div className="pokemon-pagination">
      {offset > 0 ? (
        <button
          aria-label="Previous"
          type="button"
          tabIndex={0}
          onClick={() => onBack()}
        >
          &larr;
        </button>
      ) : null}
      {totalPokemons - offset >= limit ? (
        <button aria-label="Next" tabIndex={0} onClick={() => onNext()}>
          &rarr;
        </button>
      ) : null}
      <p aria-live="polite">{paginationDescription}</p>
      <PaginationSelect<number>
        onChange={onLimitChange}
        options={LIMITS}
        value={limit}
      />
    </div>
  );
};
