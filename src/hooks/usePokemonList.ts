import { Pokemon, PokemonsResponse } from "interfaces/pokemon";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPokemons } from "api/pokemon.api"
import { STALE_TIME } from "constants/pokemon.constant";

export const usePokemonList = (offset: number, limit: number, setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>) => {
    return useQuery<PokemonsResponse>({
        queryKey: ["pokemonList", offset],
        queryFn: async () => {
            const response = await getPokemons(offset, limit);
            setPokemons(response.results);
            return response;
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        staleTime: STALE_TIME,
    });
}