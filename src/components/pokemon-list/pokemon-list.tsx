import "./pokemon-list.css";
import { Pokemon } from "@/interfaces/pokemon";
import PokemonCard from "@/components/pokemon-card/pokemon-card";
import { memo } from "react";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => (
  <div className="pokemon-list">
    {pokemons.map((pokemon, index, array) => (
      <PokemonCard
        _index={index + 1}
        key={pokemon.name}
        pokemon={pokemon}
        totalPokemons={array.length}
      />
    ))}
  </div>
);

export default memo(PokemonList);
