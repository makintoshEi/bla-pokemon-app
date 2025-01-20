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
    <div className="pokemon-pagination">
      {offset ? <a onClick={() => onBack()}>Last</a> : null}
      {totalPokemons - offset >= 100 ? (
        <a role="button" onClick={() => onNext()}>
          Next
        </a>
      ) : null}
      <p>
        Pokemons: {offset} of {totalPokemons}
      </p>
    </div>
  );
};
