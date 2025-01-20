import "./pokemon-pagination.css";

interface PokemonPaginationProps {
  offset: number;
  onBack: () => void;
  onNext: () => void;
  searchQueryLength: number;
  totalPokemons: number;
}

export const PokemonPagination = ({
  offset,
  onBack,
  onNext,
  searchQueryLength,
  totalPokemons,
}: PokemonPaginationProps) => {
  return (
    <>
      {searchQueryLength === 0 ? (
        <div className="pokemon-pagination" aria-atomic="true">
          {offset ? (
            <a tabIndex={0} role="button" onClick={() => onBack()}>
              &larr;Previous
            </a>
          ) : null}
          {totalPokemons - offset >= 100 ? (
            <a tabIndex={0} role="button" onClick={() => onNext()}>
              Next&rarr;
            </a>
          ) : null}
          <p tabIndex={0} aria-live="polite">
            Pokemons: {offset === 0 ? "100" : offset} of {totalPokemons}
          </p>
        </div>
      ) : null}
    </>
  );
};
