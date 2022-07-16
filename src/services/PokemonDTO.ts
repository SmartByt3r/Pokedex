export interface PokemonResponseDTO {
    count: number;
    next: string;
    previous: string;
    results: NamedAPIResourceDTO[];
}

export interface PokemonDescriptionDTO {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilites: PokemonAbilityDTO[];
    forms: NamedAPIResourceDTO[];
    game_indices: PokemonGameIndexDTO[];
    held_items: PokemonHeldItemDTO[];
    location_area_encounters: string;
    moves: {
        move: NamedAPIResourceDTO;
    }[];
    sprites: PokemonSpritesDTO;
    species: PokemonSpeciesDTO;
    stats: PokemonStatDTO[];
    types: PokemonTypeDTO[];
}

export interface PokemonAbilityDTO {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResourceDTO;
}

export interface NamedAPIResourceDTO {
    name: string;
    url: string;
}

export interface PokemonSpeciesDTO {}

export interface PokemonGameIndexDTO {}

export interface PokemonHeldItemDTO {}

export interface PokemonSpritesDTO {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
        "official-artwork": {
            front_default: string;
        };
    };
}

export interface PokemonStatDTO {}

export interface PokemonTypeDTO {
    slot: number;
    type: NamedAPIResourceDTO;
}
