import "./pokemon-card.css";
import { PokemonDetails } from "@/interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface PokemonCardProps {
  index: number;
  name: string;
  total: number;
  url: string;
  onClick: (pokemonDetails: PokemonDetails) => void;
}

export const PokemonCard = ({
  index,
  name,
  total,
  url,
  onClick,
}: PokemonCardProps) => {
  const { data: pokemon, isLoading } = useQuery<PokemonDetails>({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

  if (!pokemon) {
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
      onClick={() => onClick(pokemon)}
      role="button"
      aria-atomic="true"
    >
      <span tabIndex={0} aria-label={`${name}. Pokemon ${index} of ${total}.`}>
        {name}
      </span>
      <Image
        tabIndex={0}
        aria-label={`Image of ${name} pokemon.`}
        src={pokemon?.sprites.front_default || "/placeholder.webp"}
        alt={name}
        width={80}
        height={80}
      />
    </div>
  );
};
