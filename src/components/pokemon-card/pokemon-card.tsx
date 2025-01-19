import "./pokemon-card.css";
import { PokemonDetails, PokemonType } from "@/interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePokemonContext } from "@/context/pokemon-context";
import { useMemo } from "react";
import { POKEMON_TYPE } from "./pokemon-card.constants";

interface PokemonCardProps {
  index: number;
  name: string;
  total: number;
  url: string;
}

export const PokemonCard = ({ index, name, total, url }: PokemonCardProps) => {
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

  if (!pokemonDetail) {
    return null;
  }

  const style = {
    "--pokemon-color": POKEMON_TYPE[pokemonDetail.types[0].type.name],
  } as React.CSSProperties;

  return (
    <div
      className="pokemon-card"
      onClick={() => {
        setSelectedPokemon({
          name: formattedName,
          url: "",
          details: pokemonDetail,
        });
        setIsModalOpen(true);
      }}
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
        <h5
          tabIndex={0}
          aria-label={`${formattedName}. Pokemon ${index} of ${total}.`}
        >
          {formattedName}
        </h5>
      </div>
    </div>
  );
};
