import { PokemonDetails, PokemonsResponse } from "interfaces/pokemon";

const getPokemons = async (offset: number, limit: number): Promise<PokemonsResponse> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    return await response.json();
}

const getPokemon = async (url: string): Promise<PokemonDetails> => {
    const response = await fetch(url);
    return await response.json();
}

export { getPokemons, getPokemon }