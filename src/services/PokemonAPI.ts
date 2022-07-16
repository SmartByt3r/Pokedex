import axios from "axios";
import { PokemonDescriptionDTO, PokemonResponseDTO } from "./PokemonDTO";

export interface PokemonShortDesc {
    index: number;
    name: string;
    imageURI: string;
}

export interface PokemonFullDesc {
    index: number;
    name: string;
    imageURI: string;
    types: string[];
    weight: number;
    sprites: string[];
    movements: string[];
}

export async function GetAllPokemonsCount(): Promise<number> {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    return response.data.count;
}

export async function GetAllPokemons(
    count: number = 25,
    offset: number = 0
): Promise<PokemonShortDesc[]> {
    const response = await axios.get<PokemonResponseDTO>(
        "https://pokeapi.co/api/v2/pokemon/",
        {
            params: {
                offset,
                limit: count,
            },
        }
    );

    const pokemonList = response.data.results.map(async (pokemon) =>
        axios.get<PokemonDescriptionDTO>(pokemon.url)
    );

    const pokemonDescriptionList = await Promise.all(pokemonList);

    const imagesBase64List = await Promise.all(
        pokemonDescriptionList.map((pokemon) =>
            axios.get(
                pokemon.data.sprites.other["official-artwork"].front_default,
                { responseType: "blob" }
            )
        )
    );

    return pokemonDescriptionList.map((pokemonDescription, index) => ({
        index: index + 1 + offset,
        name: pokemonDescription.data.name,
        imageURI: URL.createObjectURL(imagesBase64List[index].data),
    }));
}

export async function GetPokemon(id: number): Promise<PokemonFullDesc> {
    const response = await axios.get<PokemonDescriptionDTO>(
        `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    return {
        index: response.data.id,
        name: response.data.name,
        imageURI: response.data.sprites.other["official-artwork"].front_default,
        types: response.data.types.map((type) => type.type.name),
        weight: response.data.weight,
        sprites: [
            response.data.sprites.front_default,
            response.data.sprites.front_shiny,
            response.data.sprites.front_female,
            response.data.sprites.front_shiny_female,
            response.data.sprites.back_default,
            response.data.sprites.back_shiny,
        ],
        movements: response.data.moves.map((move) => move.move.name),
    };
}

export async function GetPokemonByName(name: string): Promise<PokemonFullDesc> {
    const response = await axios.get<PokemonDescriptionDTO>(
        `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return {
        index: response.data.id,
        name: response.data.name,
        imageURI: response.data.sprites.other["official-artwork"].front_default,
        types: response.data.types.map((type) => type.type.name),
        weight: response.data.weight,
        sprites: [
            response.data.sprites.front_default,
            response.data.sprites.front_shiny,
            response.data.sprites.front_female,
            response.data.sprites.front_shiny_female,
            response.data.sprites.back_default,
            response.data.sprites.back_shiny,
        ],
        movements: response.data.moves.map((move) => move.move.name),
    };
}
