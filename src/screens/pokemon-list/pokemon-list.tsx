import "./pokemon-list.css";
import { memo } from "react";
import { Pokemon } from "interfaces/pokemon";
import PokemonCard from "screens/pokemon-card/pokemon-card";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => (
  <ul className="pokemon-list">
    {pokemons.map((pokemon, index, array) => (
      <PokemonCard
        _index={index + 1}
        key={pokemon.name}
        pokemon={pokemon}
        totalPokemons={array.length}
      />
    ))}
  </ul>
);

export default memo(PokemonList);
