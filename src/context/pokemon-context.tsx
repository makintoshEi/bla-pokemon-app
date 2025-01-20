import { Pokemon } from "interfaces/pokemon";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface PokemonContextProps {
  selectedPokemon: Pokemon | undefined;
  setSelectedPokemon: Dispatch<SetStateAction<Pokemon | undefined>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  pokemons: Pokemon[];
  setPokemons: Dispatch<SetStateAction<Pokemon[]>>;
}

const PokemonContext = createContext<PokemonContextProps>({
  selectedPokemon: undefined,
  setSelectedPokemon: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  pokemons: [],
  setPokemons: () => {},
});

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    console.log("loading context now !");
    setPokemons([]);
  }, []);

  const stateExposed = {
    selectedPokemon,
    setSelectedPokemon,
    isModalOpen,
    setIsModalOpen,
    pokemons,
    setPokemons,
  };

  return (
    <PokemonContext.Provider value={stateExposed}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = (): PokemonContextProps => {
  return useContext(PokemonContext);
};
