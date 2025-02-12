import { Pokemon, PokemonsResponse } from "interfaces/pokemon";

const getPokemons = async (offset: number, limit: number): Promise<PokemonsResponse> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
        throw new Error("An error has occurred while fetching pokemons!");
    }
    const data = await response.json();
    const pokemonWithDetails: Pokemon[] = await Promise.all(
        data.results.map((pokemon: Pokemon) => getPokemon(pokemon)),
    )

    return {
        ...data,
        results: pokemonWithDetails,
    }
}

const getPokemon = async (pokemon: Pokemon): Promise<Pokemon> => {
    const detailResponse = await fetch(pokemon.url);
    if (!detailResponse.ok) {
        throw new Error(`Error fetching details for ${pokemon.name}`);
    }
    const detailData = await detailResponse.json();
    return {
        ...pokemon,
        details: detailData,
    }
}

export { getPokemons }