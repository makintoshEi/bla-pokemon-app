import "./pokemon-list.css";
import { Pokemon } from "@/interfaces/pokemon";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";

type PokemonListProps = {
  pokemons: Pokemon[] | undefined;
  onSelectPokemon: (value: string | null) => void;
};

export const PokemonList = ({
  pokemons,
  onSelectPokemon,
}: PokemonListProps) => (
  <div className="pokemon-list">
    {pokemons?.map((pokemon, index, array) => (
      <PokemonCard
        index={index + 1}
        key={pokemon.name}
        name={pokemon.name}
        total={array.length}
        url={pokemon.url}
        onClick={() => onSelectPokemon(pokemon.name)}
      />
    ))}
  </div>
);
