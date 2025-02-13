import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  PokemonPagination,
  PokemonPaginationProps,
} from "screens/pokemon-pagination/pokemon-pagination";
import { PAGINATION_LIMIT } from "constants/pokemon.constant";

const mockOnBack = jest.fn();
const mockOnNext = jest.fn();
describe("<PokemonPagination />", () => {
  const props: PokemonPaginationProps = {
    limit: PAGINATION_LIMIT,
    offset: 0,
    onBack: mockOnBack,
    onNext: mockOnNext,
    totalPokemons: 1000,
    onLimitChange: jest.fn(),
  };

  it("should render initial page with 1000 pokemons", () => {
    const { getByText } = render(<PokemonPagination {...props} />);
    expect(getByText("→")).toBeInTheDocument();
    expect(
      getByText(`Pokemons: 1 to ${props.limit} of 1000`)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "→" }));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it("should render only previous and next buttons and 1000 pokemons", () => {
    const localProps = { ...props };
    localProps.offset = 200;
    const { getByText } = render(<PokemonPagination {...localProps} />);
    expect(getByText("←")).toBeInTheDocument();
    expect(
      getByText(
        `Pokemons: 201 to ${localProps.offset + localProps.limit} of 1000`
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "←" }));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it("should render only previous button because offset is 1000 pokemons", () => {
    const localProps = { ...props };
    localProps.offset = 1000;
    const { getByText } = render(<PokemonPagination {...localProps} />);
    expect(getByText("←")).toBeInTheDocument();
    expect(
      getByText(
        `Pokemons: ${localProps.offset + 1} to ${localProps.totalPokemons}`
      )
    ).toBeInTheDocument();
  });
});
