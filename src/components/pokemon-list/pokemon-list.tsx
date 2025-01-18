import "./pokemon-list.css";
import { Pokemon } from "@/interfaces/pokemon";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";

type PokemonListProps = {
  pokemons: Pokemon[] | undefined;
  selectPokemon: (value: string | null) => void;
};

export const PokemonList = ({ pokemons, selectPokemon }: PokemonListProps) => (
  <div className="pokemon-list">
    {pokemons?.map((pokemon, index, array) => (
      <PokemonCard
        index={index + 1}
        key={pokemon.name}
        name={pokemon.name}
        total={array.length}
        url={pokemon.url}
        onClick={() => selectPokemon(pokemon.name)}
      />
    ))}
  </div>
);
