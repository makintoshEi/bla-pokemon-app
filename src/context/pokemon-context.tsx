import { Pokemon } from "interfaces/pokemon";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface PokemonContextProps {
  selectedPokemon: Pokemon | undefined;
  setSelectedPokemon: Dispatch<SetStateAction<Pokemon | undefined>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const PokemonContext = createContext<PokemonContextProps>({
  selectedPokemon: undefined,
  setSelectedPokemon: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
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

  const stateExposed = {
    selectedPokemon,
    setSelectedPokemon,
    isModalOpen,
    setIsModalOpen,
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
