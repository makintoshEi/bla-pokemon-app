export interface Pokemon {
    name: string;
    url: string;
    details?: PokemonDetails;
}

export interface PokemonDetails {
    abilities: Ability[];
    forms: Common[];
    moves: Move[];
    sprites: Sprite;
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
    front_default: string;
}

