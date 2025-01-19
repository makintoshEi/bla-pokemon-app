import "./pokemon-card.css";
import { PokemonDetails } from "@/interfaces/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePokemonContext } from "@/context/pokemon-context";

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
        setSelectedPokemon({ name: name, url: "", details: pokemonDetail });
        setIsModalOpen(true);
      }}
      role="button"
      aria-atomic="true"
    >
      <span tabIndex={0} aria-label={`${name}. Pokemon ${index} of ${total}.`}>
        {name}
      </span>
      <Image
        tabIndex={0}
        aria-label={`Image of ${name} pokemon.`}
        src={pokemonDetail?.sprites.front_default || "/placeholder.webp"}
        alt={name}
        width={80}
        height={80}
      />
    </div>
  );
};
