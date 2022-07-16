import {
    GetAllPokemons,
    GetAllPokemonsCount,
    GetPokemon,
    GetPokemonByName,
} from "./PokemonAPI";

describe("PokemonAPI", () => {
    it("should return a pokemon", async () => {
        const pokemon = await GetPokemon(1);
        expect(pokemon).toBeDefined();
        expect(pokemon.name).toBe("bulbasaur");
        expect(pokemon.index).toBe(1);
    });
    it("should return a pokemon by name", async () => {
        const pokemon = await GetPokemonByName("bulbasaur");
        expect(pokemon).toBeDefined();
        expect(pokemon.name).toBe("bulbasaur");
        expect(pokemon.index).toBe(1);
    });
    it("should throw an error when pokemon is not found", async () => {
        await expect(GetPokemon(0)).rejects.toThrow();
        await expect(GetPokemonByName("gsdgj")).rejects.toThrow();
    });
    it("should return a pokemon list", async () => {
        global.URL.createObjectURL = jest.fn();
        const pokemonList = await GetAllPokemons();
        expect(pokemonList).toBeDefined();
        expect(pokemonList.length).toBe(25);
        expect(pokemonList[0].name).toBe("bulbasaur");
        expect(pokemonList[0].index).toBe(1);
    });
    it("should return the total pokemon count", async () => {
        const pokemonCount = await GetAllPokemonsCount();
        expect(pokemonCount).toBeDefined();
        expect(pokemonCount).toBeGreaterThan(0);
    });
});
