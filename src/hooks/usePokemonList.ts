import { PokemonsResponse } from "interfaces/pokemon";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPokemons } from "api/pokemon.api"
import { STALE_TIME } from "constants/pokemon.constant";

export const usePokemonList = (offset: number, limit: number) => {
    return useQuery<PokemonsResponse>({
        queryKey: ["pokemonList", offset, limit],
        queryFn: () => getPokemons(offset, limit),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        staleTime: STALE_TIME,
    });
}