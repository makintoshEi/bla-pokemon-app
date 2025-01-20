import "./pokemon-pagination.css";

interface PokemonPaginationProps {
  offset: number;
  onBack: () => void;
  onNext: () => void;
  totalPokemons: number;
}

export const PokemonPagination = ({
  offset,
  onBack,
  onNext,
  totalPokemons,
}: PokemonPaginationProps) => {
  return (
    <div className="pokemon-pagination" aria-atomic="true">
      {offset ? (
        <a tabIndex={0} onClick={() => onBack()}>
          &larr;Previous
        </a>
      ) : null}
      {totalPokemons - offset >= 100 ? (
        <a tabIndex={0} role="button" onClick={() => onNext()}>
          Next&rarr;
        </a>
      ) : null}
      <p tabIndex={0} aria-live="polite">
        Pokemons: {offset} of {totalPokemons}
      </p>
    </div>
  );
};
