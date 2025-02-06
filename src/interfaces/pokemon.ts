export interface Pokemon {
    name: string;
    url: string;
    details?: PokemonDetails;
}

export interface PokemonDetails {
    id: number;
    abilities: Ability[];
    forms: Common[];
    moves: Move[];
    sprites: Sprite;
    types: Types[];
}

interface Ability {
    ability: Common
}

interface Common {
    name: string;
    url: string;
}

interface Move {
    move: {
        name: string
    }
}

interface Sprite {
    other: {
        home: {
            front_default: string
        },
        ['official-artwork']: {
            front_default: string
        }
    };
}

interface Types {
    slot: number,
    type: {
        name: PokemonType,
        url: string
    }
}

export type PokemonType = 'bug' | 'dark' | 'dragon' | 'electric' | 'fairy' |
    'fighting' | 'fire' | 'flying' | 'ghost' | 'normal' | 'grass' | 'ground' |
    'ice' | 'poison' | 'psychic' | 'rock' | 'steel' | 'water';

export interface PokemonsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}
