import "./pokemon-card.css";
import { useCallback, useMemo, memo } from "react";
import { Pokemon } from "interfaces/pokemon";
import { usePokemonContext } from "context/pokemon-context";
import { POKEMON_TYPE } from "constants/pokemon.constant";
import PokemonImage from "components/optimized-image/optimized-image";
import { PokemonInfo } from "./pokemon-info";

interface PokemonCardProps {
  _index: number;
  pokemon: Pokemon;
  totalPokemons: number;
}

const PokemonCard = ({ _index, pokemon, totalPokemons }: PokemonCardProps) => {
  const { setSelectedPokemon, setIsModalOpen } = usePokemonContext();

  const formattedName = useMemo(
    () => `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`,
    [pokemon.name]
  );

  const onSelectPokemon = useCallback(() => {
    setSelectedPokemon({
      name: formattedName,
      url: "",
      details: pokemon.details,
    });
    setIsModalOpen(true);
  }, [formattedName, pokemon.details, setSelectedPokemon, setIsModalOpen]);

  const handleSelectPokemon = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    if (e.type === "keyup") {
      const keyboardEvt = e as React.KeyboardEvent<HTMLLIElement>;
      if (keyboardEvt.key === "Enter") {
        onSelectPokemon();
      }
      return;
    }
    onSelectPokemon();
  };

  const style = {
    "--pokemon-color": POKEMON_TYPE[pokemon.details!.types[0]?.type.name],
  } as React.CSSProperties;

  return (
    <li
      data-testid={pokemon.name}
      className="pokemon-card"
      onClick={handleSelectPokemon}
      onKeyUp={handleSelectPokemon}
      role="button"
      aria-label={`${pokemon.name}`}
      tabIndex={0}
    >
      <div style={style} className="pokemon-card__image-container">
        <PokemonImage
          ariaLabel={`${formattedName}`}
          src={pokemon.details!.sprites.other["official-artwork"].front_default}
          alt={formattedName}
          width={100}
          height={100}
        />
      </div>
      <div className="pokemon-card__info">
        <PokemonInfo
          idx={_index}
          pokemonDetails={pokemon.details}
          pokemonName={formattedName}
          style={style}
          totalPokemons={totalPokemons}
        />
      </div>
    </li>
  );
};

export default memo(PokemonCard);
