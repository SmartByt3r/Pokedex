import { fireEvent, render, screen } from "@testing-library/react";
import PokemonCard, { PokemonCardProps } from "./PokemonCard";

const mockData: PokemonCardProps = {
    index: 1,
    name: "Bulbasaur",
    imageURI: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    onClick: () => {},
};
describe("PokemonCard", () => {
    test("renders pokemon card", () => {
        render(<PokemonCard {...mockData} />);
        const card = screen.getByText("#1 Bulbasaur");
        expect(card).toBeInTheDocument();
    });

    test("click on pokemon card", () => {
        const clickHandler = jest.fn();
        render(<PokemonCard {...mockData} onClick={clickHandler} />);
        const button = screen.getByText("#1 Bulbasaur");
        fireEvent.click(button);
        expect(clickHandler).toHaveBeenCalled();
    });
});
