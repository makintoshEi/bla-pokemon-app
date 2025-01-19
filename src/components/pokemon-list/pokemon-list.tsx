import "./pokemon-list.css";
import { Pokemon } from "@/interfaces/pokemon";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";

interface PokemonListProps {
  pokemons: Pokemon[] | undefined;
}

export const PokemonList = ({ pokemons }: PokemonListProps) => (
  <div className="pokemon-list">
    {pokemons?.map((pokemon, index, array) => (
      <PokemonCard
        index={index + 1}
        key={pokemon.name}
        name={pokemon.name}
        total={array.length}
        url={pokemon.url}
      />
    ))}
  </div>
);
