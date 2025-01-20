import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PokemonPagination } from "screens/pokemon-pagination/pokemon-pagination";

const mockOnBack = jest.fn();
const mockOnNext = jest.fn();
describe("<PokemonPagination />", () => {
  const props = {
    offset: 0,
    onBack: mockOnBack,
    onNext: mockOnNext,
    searchQueryLength: 0,
    totalPokemons: 1000,
  };
  it("should render only next buttons and 1000 pokemons", () => {
    const { getByText } = render(<PokemonPagination {...props} />);
    expect(getByText("Next→")).toBeInTheDocument();
    expect(getByText("Pokemons: 100 of 1000").textContent).toBe(
      "Pokemons: 100 of 1000"
    );
    fireEvent.click(screen.getByRole("button", { name: "Next→" }));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it("should render only previous and next buttons and 1000 pokemons", () => {
    const localProps = { ...props };
    localProps.offset = 200;
    const { getByText } = render(<PokemonPagination {...localProps} />);
    expect(getByText("←Previous")).toBeInTheDocument();
    expect(getByText("Pokemons: 200 of 1000").textContent).toBe(
      "Pokemons: 200 of 1000"
    );
    fireEvent.click(screen.getByRole("button", { name: "←Previous" }));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it("should render only previous button because offset is 1000 pokemons", () => {
    const localProps = { ...props };
    localProps.offset = 1000;
    const paginationText = "Pokemons: 1000 of 1000";
    const { getByText } = render(<PokemonPagination {...localProps} />);
    expect(getByText("←Previous")).toBeInTheDocument();
    expect(getByText(paginationText).textContent).toBe(paginationText);
  });
});
