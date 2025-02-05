import { CSSProperties, useMemo } from "react";
import { PokemonDetails } from "interfaces/pokemon";
import { Chip } from "components/chip/chip";

interface PokemonInfoProps {
  idx: number;
  pokemonDetails: PokemonDetails | undefined;
  pokemonName: string;
  style: CSSProperties;
  totalPokemons: number;
}

export const PokemonInfo = ({
  idx,
  pokemonDetails,
  pokemonName,
  style,
  totalPokemons,
}: PokemonInfoProps) => {
  const formattedID = useMemo(() => {
    if (!pokemonDetails?.id) {
      return "";
    }
    const pokemonIdLength = pokemonDetails.id.toString().length;
    switch (pokemonIdLength) {
      case 1:
        return `000${pokemonDetails.id}`;
      case 2:
        return `00${pokemonDetails.id}`;
      case 3:
        return `0${pokemonDetails.id}`;
      default:
        return pokemonDetails.id;
    }
  }, [pokemonDetails?.id]);

  return (
    <>
      <span>#{formattedID}</span>
      <div className="pokemon-card__info-type">
        <h5
          tabIndex={0}
          aria-label={`${pokemonName}. Pokemon ${idx} of ${totalPokemons}.`}
        >
          {pokemonName}
        </h5>
        <Chip styles={style}>{pokemonDetails!.types[0]?.type.name}</Chip>
      </div>
    </>
  );
};
