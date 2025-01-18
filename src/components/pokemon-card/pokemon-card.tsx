import "./pokemon-card.css";
import { Pokemon } from "@/interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";

interface PokemonCardProps {
  index: number;
  name: string;
  total: number;
  url: string;
  onClick: () => void;
}

export const PokemonCard = ({
  index,
  name,
  total,
  url,
  onClick,
}: PokemonCardProps) => {
  const { data: pokemon, isLoading } = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div className="pokemon-card">
        <span>Loading...</span>
      </div>
    );

  return (
    <div
      className="pokemon-card"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`${name}. Pokemon ${index} of ${total}`}
    >
      <span>{name}</span>
      <div className="flex justify-center">
        <img
          src={pokemon?.sprites?.front_default || "/placeholder.svg"}
          alt={name}
          className="pokemon-card__image w-32 h-32"
        />
      </div>
    </div>
  );
};
