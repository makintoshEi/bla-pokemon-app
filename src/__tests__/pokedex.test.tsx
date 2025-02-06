import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Pokedex } from "screens/pokedex/pokedex";
import { PokemonProvider } from "context/pokemon-context";
import { getPokemons } from "../api/pokemon.api";
import "@testing-library/jest-dom";
import { PokemonsResponse } from "interfaces/pokemon";
import pokemonsMock from "./mock-data.json";

jest.mock("../api/pokemon.api");

jest.mock("lodash", () => ({
  debounce: jest.fn(() => console.log("debouncing")),
}));

const mockGetPokemons = getPokemons as jest.MockedFunction<typeof getPokemons>;

const pokemonsResponse = pokemonsMock as PokemonsResponse;

describe("<Pokedex />", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    jest.resetAllMocks();
  });

  function renderWithQueryClient() {
    return render(
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>
          <Pokedex />
        </PokemonProvider>
      </QueryClientProvider>
    );
  }

  it("should render loading state initially", async () => {
    mockGetPokemons.mockResolvedValue({
      count: 0,
      next: "",
      previous: "",
      results: [],
    });
    const { getByTestId } = renderWithQueryClient();
    expect(getByTestId("spinner")).toBeInTheDocument();
  });

  it("should render pokemon list after loading", async () => {
    mockGetPokemons.mockResolvedValue(pokemonsResponse);

    const { getByText } = renderWithQueryClient();

    await waitFor(() => {
      expect(getByText("Bulbasaur")).toBeInTheDocument();
      expect(getByText("Ivysaur")).toBeInTheDocument();
    });
  });

  it("should handle error state", async () => {
    mockGetPokemons.mockRejectedValue(new Error("API error"));

    const { getByText } = renderWithQueryClient();

    await waitFor(() => {
      expect(
        getByText("Error loading pokemons, refresh the page")
      ).toBeInTheDocument();
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
});
