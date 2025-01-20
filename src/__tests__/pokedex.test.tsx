import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Pokedex } from "screens/pokedex/pokedex";
import { PokemonProvider } from "context/pokemon-context";
import { getPokemons, getPokemon } from "../api/pokemon.api";
import "@testing-library/jest-dom";
import { PokemonType } from "interfaces/pokemon";

jest.mock("../api/pokemon.api");

// Mock the debounce function
jest.mock("lodash", () => ({
  debounce: jest.fn(() => console.log("debouncing")),
}));

const mockGetPokemons = getPokemons as jest.MockedFunction<typeof getPokemons>;
const mockGetPokemon = getPokemon as jest.MockedFunction<typeof getPokemon>;

const mockPokemons = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
  },
  {
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/4/",
  },
];

const mockPokemon = {
  abilities: [
    {
      ability: {
        name: "overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
      },
    },
    {
      ability: {
        name: "chlorophyll",
        url: "https://pokeapi.co/api/v2/ability/34/",
      },
    },
  ],
  forms: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon-form/1/",
    },
  ],
  id: 1,
  moves: [
    {
      move: {
        name: "razor-wind",
      },
    },
    {
      move: {
        name: "swords-dance",
      },
    },
    {
      move: {
        name: "cut",
      },
    },
  ],
  sprites: {
    other: {
      home: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
      },
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "grass" as PokemonType,
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
  ],
};

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
    expect(getByTestId("pokedex-skeleton")).toBeInTheDocument();
  });

  it("should render pokemon list after loading", async () => {
    mockGetPokemons.mockResolvedValue({
      count: 1400,
      next: "",
      previous: "",
      results: mockPokemons,
    });

    mockGetPokemon.mockResolvedValue(mockPokemon);

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
    mockGetPokemons.mockResolvedValue({
      count: 1400,
      next: "",
      previous: "",
      results: mockPokemons,
    });

    mockGetPokemon.mockResolvedValue(mockPokemon);

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
});
