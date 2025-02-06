import { Pokemon, PokemonsResponse } from "interfaces/pokemon";

const getPokemons = async (offset: number, limit: number): Promise<PokemonsResponse> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
        throw new Error("An error has ocurred while fetching pokemons!");
    }
    const data = await response.json();
    const pokemonWithDetails: Pokemon[] = await Promise.all(
        data.results.map(async (pokemon: Pokemon) => {
            const detailResponse = await fetch(pokemon.url)
            const detailData = await detailResponse.json()
            return {
                ...pokemon,
                details: detailData,
            }
        }),
    )

    return {
        ...data,
        results: pokemonWithDetails,
    }
}


export { getPokemons }