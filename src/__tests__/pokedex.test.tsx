import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MainPokedex from "app/pokedex/page";
import { getPokemons } from "../api/pokemon.api";
import { PokemonsResponse } from "interfaces/pokemon";
import pokemonsMock from "./mock-data.json";

jest.mock("../api/pokemon.api");

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetIsLoggedIn = jest.fn();
jest.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: () => [true, mockSetIsLoggedIn],
}));

jest.mock("lodash", () => ({
  debounce: jest.fn(() => console.log("debouncing")),
}));

const mockGetPokemons = getPokemons as jest.MockedFunction<typeof getPokemons>;

const pokemonsResponse = pokemonsMock as PokemonsResponse;

function renderWithQueryClient() {
  return render(<MainPokedex />);
}

describe("app/<Pokedex />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should handle error state", async () => {
    mockGetPokemons.mockRejectedValueOnce(() =>
      Promise.reject(new Error("API error"))
    );
    const { getByText } = renderWithQueryClient();
    await new Promise((r) => setTimeout(r, 3000));
    await waitFor(() => {
      expect(
        getByText("Error loading pokemons, refresh the page")
      ).toBeInTheDocument();
    });
  });

  it("should render pokemon list after loading", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);

    const { getByText } = renderWithQueryClient();

    await waitFor(() => {
      expect(getByText("Bulbasaur")).toBeInTheDocument();
      expect(getByText("Ivysaur")).toBeInTheDocument();
    });
  });

  it("should search for bulbasaur", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);

    const { getByText, getByPlaceholderText } = renderWithQueryClient();
    await waitFor(() => {
      const searchBarInput = getByPlaceholderText("Search pokemon");
      fireEvent.change(searchBarInput, {
        target: { value: "bulbasaur" },
      });
      expect(searchBarInput).toHaveValue("bulbasaur");
      expect(getByText("Bulbasaur")).toBeInTheDocument();
    });
  });

  it("should search for pikachu and not found it", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);

    const { getByText, getByPlaceholderText } = renderWithQueryClient();
    await waitFor(() => {
      const searchBarInput = getByPlaceholderText("Search pokemon");
      fireEvent.change(searchBarInput, {
        target: { value: "pikachu" },
      });
      expect(searchBarInput).toHaveValue("pikachu");
      expect(getByText("No pokemon matches this search")).toBeInTheDocument();
    });
  });

  it("should click on Bulbasaur and show modal and then close the modal", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);

    const { getByText, getByRole, getByTestId } = renderWithQueryClient();
    await waitFor(() => {
      const pokemonElement = getByTestId("bulbasaur");
      fireEvent.click(pokemonElement);
      expect(getByText("Abilities")).toBeInTheDocument();
      fireEvent.click(getByRole("button", { name: "×" }));
    });
  });

  it("should change limit to 50", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);
    const { getAllByText, getAllByRole } = renderWithQueryClient();
    await waitFor(() => {
      const limitSelectEl = getAllByRole("combobox")[0] as HTMLSelectElement;
      fireEvent.change(limitSelectEl, { target: { value: 50 } });
      expect(getAllByText("Pokemons: 1 to 50 of 1304")[0]).toBeInTheDocument();
    });
  });

  it("should click on next pagination button with initial limit of 25", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);
    const { getAllByText } = renderWithQueryClient();
    await waitFor(() => {
      const nextButtonEl = getAllByText("Next→")[0] as HTMLButtonElement;
      fireEvent.click(nextButtonEl);
    });
    expect(getAllByText("Pokemons: 26 to 50 of 1304")[0]).toBeInTheDocument();
    expect(getAllByText("←Previous")[0]).toBeInTheDocument();
  });

  it("should click on next pagination button and then navigate back", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);
    const { getAllByText } = renderWithQueryClient();
    await waitFor(() => {
      const nextButtonEl = getAllByText("Next→")[0] as HTMLButtonElement;
      fireEvent.click(nextButtonEl);
    });
    expect(getAllByText("Pokemons: 26 to 50 of 1304")[0]).toBeInTheDocument();
    const previousButtonEl = getAllByText("←Previous")[0] as HTMLButtonElement;
    await waitFor(() => {
      fireEvent.click(previousButtonEl);
    });
    expect(getAllByText("Pokemons: 1 to 25 of 1304")[0]).toBeInTheDocument();
  });
});
