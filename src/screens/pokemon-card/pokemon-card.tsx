import "./pokemon-card.css";
import { useCallback, useMemo, memo } from "react";
import { Pokemon, PokemonDetails } from "interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";
import { usePokemonContext } from "context/pokemon-context";
import { POKEMON_TYPE } from "constants/pokemon.constant";
import { Chip } from "components/chip/chip";
import { getPokemon } from "api/pokemon.api";
import PokemonImage from "next/image";

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

  const formattedID = useMemo(() => {
    if (!pokemonDetail?.id) {
      return "";
    }
    const pokemonIdLength = pokemonDetail.id.toString().length;
    switch (pokemonIdLength) {
      case 1:
        return `000${pokemonDetail.id}`;
      case 2:
        return `00${pokemonDetail.id}`;
      case 3:
        return `0${pokemonDetail.id}`;
      default:
        return pokemonDetail.id;
    }
  }, [pokemonDetail?.id]);

  const handleSelectPokemon = useCallback(() => {
    setSelectedPokemon({
      name: formattedName,
      url: "",
      details: pokemonDetail,
    });
    setIsModalOpen(true);
  }, [formattedName, pokemonDetail, setIsModalOpen, setSelectedPokemon]);

  if (!pokemonDetail) {
    return null;
  }

  if (isError) {
    return (
      <div className="pokemon-card__error">
        <span>Error loading the pokemon...</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pokemon-card__loading">
        <span>Loading...</span>
      </div>
    );
  }

  const pokemonType = pokemonDetail.types[0]?.type.name;

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
          tabIndex={0}
          aria-label={`Image of ${formattedName} pokemon.`}
          src={
            pokemonDetail.sprites.other["official-artwork"].front_default ||
            "/placeholder.webp"
          }
          alt={formattedName}
          width={100}
          height={100}
          loading="lazy"
          unoptimized
        />
      </div>
      <div className="pokemon-card__info">
        <span>#{formattedID}</span>
        <div className="pokemon-card__info-type">
          <h5
            tabIndex={0}
            aria-label={`${formattedName}. Pokemon ${_index} of ${totalPokemons}.`}
          >
            {formattedName}
          </h5>
          <Chip styles={style}>{pokemonType}</Chip>
        </div>
      </div>
    </div>
  );
};

export default memo(PokemonCard);
