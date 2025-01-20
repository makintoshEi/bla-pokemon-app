import { PokemonType } from "interfaces/pokemon";

export const POKEMON_TYPE: Record<PokemonType, string> = {
    'bug': '#A7B723',
    'dark': '#75574C',
    'dragon': '#7037FF',
    'electric': '#F9CF30',
    'fairy': '#E69EAC',
    'fighting': '#C12239',
    'fire': '#F57D31',
    'flying': '#A891EC',
    'ghost': '#70559B',
    'normal': '#AAA67F',
    'grass': '#74CB48',
    'ground': '#DEC16B',
    'ice': '#9AD6DF',
    'poison': '#A43E9E',
    'psychic': '#FB5584',
    'rock': '#B69E31',
    'steel': '#B7B9D0',
    'water': '#6493EB',
}

export const PAGINATION_LIMITS = [50, 100, 200];