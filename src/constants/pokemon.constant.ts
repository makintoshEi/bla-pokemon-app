import { PokemonType } from "interfaces/pokemon";

const POKEMON_TYPE: Record<PokemonType, string> = {
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

const PAGINATION_LIMIT = 100;
const DEBOUNCE_TIME = 300;
const STALE_TIME = 24 * 60 * 60 * 1000;

export { DEBOUNCE_TIME, PAGINATION_LIMIT, POKEMON_TYPE, STALE_TIME };