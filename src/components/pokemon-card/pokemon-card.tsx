import "./pokemon-card.css";
import { PokemonDetails } from "@/interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePokemonContext } from "@/context/pokemon-context";
import { useMemo } from "react";

interface PokemonCardProps {
  index: number;
  name: string;
  total: number;
  url: string;
}

export const PokemonCard = ({ index, name, total, url }: PokemonCardProps) => {
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
  const { setSelectedPokemon, setIsModalOpen } = usePokemonContext();

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
      <span
        tabIndex={0}
        aria-label={`${formattedName}. Pokemon ${index} of ${total}.`}
      >
        {formattedName}
      </span>
      <Image
        tabIndex={0}
        aria-label={`Image of ${formattedName} pokemon.`}
        src={pokemonDetail?.sprites.front_default || "/placeholder.webp"}
        alt={formattedName}
        width={100}
        height={100}
      />
    </div>
  );
};
