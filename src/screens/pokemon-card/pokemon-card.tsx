import "./pokemon-card.css";
import { useCallback, useMemo, memo } from "react";
import { Pokemon, PokemonDetails } from "interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";
import { usePokemonContext } from "context/pokemon-context";
import { POKEMON_TYPE } from "constants/pokemon.constant";
import { getPokemon } from "api/pokemon.api";
import PokemonImage from "components/optimized-image/optimized-image";
import { Message } from "components/message/message";
import { PokemonInfo } from "./pokemon-info";

interface PokemonCardProps {
  _index: number;
  pokemon: Pokemon;
  totalPokemons: number;
}

const PokemonCard = ({ _index, pokemon, totalPokemons }: PokemonCardProps) => {
  const { setSelectedPokemon, setIsModalOpen } = usePokemonContext();
  const {
    data: pokemonDetail,
    isLoading,
    isError,
  } = useQuery<PokemonDetails>({
    queryKey: ["pokemon", pokemon.name],
    queryFn: async () => await getPokemon(pokemon.url),
  });

  const formattedName = useMemo(
    () => `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`,
    [pokemon.name]
  );

  const handleSelectPokemon = useCallback(() => {
    setSelectedPokemon({
      name: formattedName,
      url: "",
      details: pokemonDetail,
    });
    setIsModalOpen(true);
  }, [formattedName, pokemonDetail, setIsModalOpen, setSelectedPokemon]);

  if (isError) {
    return (
      <div className="pokemon-card__error">
        <Message message="Error loading the pokemon..." variant="error" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pokemon-card__loading">
        <Message message="loading..." />
      </div>
    );
  }

  const pokemonType = pokemonDetail!.types[0]?.type.name;

  const style = {
    "--pokemon-color": POKEMON_TYPE[pokemonType],
  } as React.CSSProperties;

  return (
    <div
      data-testid={pokemon.name}
      className="pokemon-card"
      onClick={handleSelectPokemon}
      role="button"
      aria-label={`This is ${pokemon.name} pokemon`}
      aria-atomic="true"
      tabIndex={0}
    >
      <div style={style} className="pokemon-card__image-container">
        <PokemonImage
          ariaLabel={`Image of ${formattedName} pokemon.`}
          src={pokemonDetail!.sprites.other["official-artwork"].front_default}
          alt={formattedName}
          width={100}
          height={100}
        />
      </div>
      <div className="pokemon-card__info">
        <PokemonInfo
          idx={_index}
          pokemonDetails={pokemonDetail}
          pokemonName={formattedName}
          style={style}
          totalPokemons={totalPokemons}
        />
      </div>
    </div>
  );
};

export default memo(PokemonCard);
