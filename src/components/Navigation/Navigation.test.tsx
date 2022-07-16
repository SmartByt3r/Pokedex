import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

test("renders previous page button", () => {
    render(<Navigation onNextPage={() => {}} onPreviousPage={() => {}} />);
    const previousPageButton = screen.getByText("<");
    expect(previousPageButton).toBeInTheDocument();
});
test("renders next page button", () => {
    render(<Navigation onNextPage={() => {}} onPreviousPage={() => {}} />);
    const nextPageButton = screen.getByText(">");
    expect(nextPageButton).toBeInTheDocument();
});
test("renders logo", () => {
    render(<Navigation onNextPage={() => {}} onPreviousPage={() => {}} />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
});
