import "./pokemon-card.css";
import { memo } from "react";
import { PokemonDetails } from "@/interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePokemonContext } from "@/context/pokemon-context";
import { useCallback, useMemo } from "react";
import { POKEMON_TYPE } from "../../constants/pokemon.constant";
import { Chip } from "../chip/chip";

interface PokemonCardProps {
  index: number;
  name: string;
  total: number;
  url: string;
}

const PokemonCard = ({ index, name, total, url }: PokemonCardProps) => {
  const { setSelectedPokemon, setIsModalOpen } = usePokemonContext();
  const {
    data: pokemonDetail,
    isLoading,
    isError,
  } = useQuery<PokemonDetails>({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

  const formattedName = useMemo(
    () => `${name[0].toUpperCase() + name.slice(1)} `,
    [name]
  );

  const formattedID = useMemo(() => {
    if (!pokemonDetail?.id) {
      return "";
    }
    const pokemonIdLength = pokemonDetail.id.toString().length;
    switch (pokemonIdLength) {
      case 4:
        return pokemonDetail.id;
      case 3:
        return `0${pokemonDetail.id}`;
      case 2:
        return `00${pokemonDetail.id}`;
      default:
        return `000${pokemonDetail.id}`;
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
        <span>Error loading the component...</span>
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

  const pokemonType = pokemonDetail.types[0].type.name;

  const style = {
    "--pokemon-color": POKEMON_TYPE[pokemonType],
  } as React.CSSProperties;

  return (
    <div
      className="pokemon-card"
      onClick={handleSelectPokemon}
      role="button"
      aria-atomic="true"
      tabIndex={0}
    >
      <div style={style} className="pokemon-card__image-container">
        <Image
          tabIndex={0}
          aria-label={`Image of ${formattedName} pokemon.`}
          src={
            pokemonDetail.sprites.other["official-artwork"].front_default ||
            "/placeholder.webp"
          }
          alt={formattedName}
          width={100}
          height={100}
        />
      </div>
      <div className="pokemon-card__info">
        <span>#{formattedID}</span>
        <div className="pokemon-card__info-type">
          <h5
            tabIndex={0}
            aria-label={`${formattedName}. Pokemon ${index} of ${total}.`}
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
