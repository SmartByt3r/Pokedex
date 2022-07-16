import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as PokemonAPI from "./services/PokemonAPI";
import App from "./App";
import { PokemonShortDesc } from "./services/PokemonAPI";
import userEvent from "@testing-library/user-event";

const mockDataPokemonShrt: PokemonShortDesc[] = [
    {
        index: 1,
        name: "bulbasaur",
        imageURI: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    },
];

const mockDataPokemonFull: PokemonAPI.PokemonFullDesc = {
    index: 1,
    name: "bulbasaur",
    imageURI: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    movements: ["Tackle", "Growl", "Leech Seed", "Vine Whip"],
    types: ["Grass", "Poison"],
    sprites: [
        "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/bulbasaur.png",
        "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/bulbasaur.png",
    ],
    weight: 4,
};

describe("App", () => {
    beforeEach(() => {
        jest.spyOn(PokemonAPI, "GetAllPokemons").mockImplementation(
            (count, offset) => Promise.resolve(mockDataPokemonShrt)
        );
        jest.spyOn(PokemonAPI, "GetPokemonByName").mockImplementation(
            (pokemonName) => {
                if (pokemonName === "bulbasaur")
                    return Promise.resolve(mockDataPokemonFull);
                return Promise.reject();
            }
        );
        jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    it("renders itself", async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getByTestId("app-header")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByTestId("app-body")).toBeInTheDocument();
        });
    });

    describe("modal window", () => {
        it("should open modal when a card is clicked", async () => {
            render(<App />);
            const card = await screen.findByText("#1 bulbasaur");
            fireEvent.click(card);
            await waitFor(() => {
                expect(screen.getByTestId("pokemon-modal")).toBeInTheDocument();
            });
        });

        it("should close modal when close button is clicked", async () => {
            render(<App />);
            const card = await screen.findByText("#1 bulbasaur");
            fireEvent.click(card);
            await waitFor(() => {
                expect(screen.getByTestId("pokemon-modal")).toBeInTheDocument();
            });
            const closeButton = await screen.findByText("X");
            fireEvent.click(closeButton);
            await waitFor(() => {
                expect(
                    screen.queryByTestId("pokemon-modal")
                ).not.toBeInTheDocument();
            });
        });
    });

    describe("search form", () => {
        it("should search for a pokemon by name", async () => {
            render(<App />);
            const searchInput =
                screen.getByPlaceholderText("Enter pokemon name");
            fireEvent.change(searchInput, { target: { value: "bulbasaur" } });
            const searchButton = screen.getByText("Search");
            fireEvent.click(searchButton);
            await waitFor(() => {
                expect(screen.getByTestId("pokemon-modal")).toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.getByTestId("pokemon-modal")).toContainElement(
                    screen.getByText("bulbasaur")
                );
            });
        });
        it("should show alert if pokemon is not found", async () => {
            render(<App />);
            const searchInput =
                screen.getByPlaceholderText("Enter pokemon name");
            fireEvent.change(searchInput, { target: { value: "not-found" } });
            const searchButton = screen.getByText("Search");
            fireEvent.click(searchButton);
            await waitFor(() => {
                expect(window.alert).toHaveBeenCalledWith("Pokemon not found");
            });
        });
    });

    describe("pagination", () => {
        it("should show next page", async () => {
            render(<App />);
            const nextPageButton = screen.getByText(">");
            fireEvent.click(nextPageButton);
            await waitFor(() => {
                expect(screen.getByText("#1 bulbasaur")).toBeInTheDocument();
            });
        });
        it("should show previous page", async () => {
            render(<App />);
            const nextPageButton = screen.getByText(">");
            fireEvent.click(nextPageButton);
            await waitFor(() => {
                expect(screen.getByText("#1 bulbasaur")).toBeInTheDocument();
            });
            const previousPageButton = screen.getByText("<");
            fireEvent.click(previousPageButton);
            await waitFor(() => {
                expect(screen.getByText("#1 bulbasaur")).toBeInTheDocument();
            });
        });
    });
});
