export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetails {
    abilities: Common[],
    forms: Common[],
    moves: Move[],
    sprites: Sprite

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

