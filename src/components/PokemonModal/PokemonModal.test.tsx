import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PokemonModal from "./PokemonModal";
import { PokemonFullDesc } from "../../services/PokemonAPI";

const mockData: PokemonFullDesc = {
    index: 1,
    name: "Bulbasaur",
    imageURI: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    movements: ["Tackle", "Growl", "Leech Seed", "Vine Whip"],
    types: ["Grass", "Poison"],
    sprites: [
        "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/bulbasaur.png",
        "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/bulbasaur.png",
    ],
    weight: 4,
};
describe("PokemonModal", () => {
    it("renders modal into screen", () => {
        render(<PokemonModal onClose={() => {}} show pokemonInfo={mockData} />);
        const modal = screen.getByText("Bulbasaur");
        expect(modal).toBeInTheDocument();
    });

    it("not renders modal into screen", () => {
        render(
            <PokemonModal
                onClose={() => {}}
                show={false}
                pokemonInfo={mockData}
            />
        );
        const modal = screen.queryByText("Bulbasaur");
        expect(modal).not.toBeInTheDocument();
    });

    it("renders close button", () => {
        render(
            <PokemonModal
                onClose={() => {}}
                show={true}
                pokemonInfo={mockData}
            />
        );
        const closeButton = screen.getByText("X");
        expect(closeButton).toBeInTheDocument();
    });

    test("click on close button", () => {
        const closeHandler = jest.fn();
        render(
            <PokemonModal
                onClose={closeHandler}
                show={true}
                pokemonInfo={mockData}
            />
        );
        const closeButton = screen.getByText("X");
        fireEvent.click(closeButton);
        expect(closeHandler).toHaveBeenCalled();
    });

    it("renders pokemon sprites", () => {
        render(
            <PokemonModal
                onClose={() => {}}
                show={true}
                pokemonInfo={mockData}
            />
        );
        const sprites = screen.getAllByAltText("sprite");
        sprites.forEach((sprite) => {
            expect(sprite).toBeInTheDocument();
        });
    });

    it("not render if pokemonInfo is not provided", () => {
        render(
            <PokemonModal
                onClose={() => {}}
                show={true}
                pokemonInfo={undefined}
            />
        );
        const modal = screen.queryByText("Bulbasaur");
        expect(modal).not.toBeInTheDocument();
    });
});
