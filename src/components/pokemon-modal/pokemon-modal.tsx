import Modal from "@/components/modal/modal";
import { usePokemonContext } from "@/context/pokemon-context";

export const PokemonModal = () => {
  const { isModalOpen, selectedPokemon, setIsModalOpen } = usePokemonContext();

  if (!selectedPokemon) {
    return null;
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={selectedPokemon.name}
    >
      <div className="pokemon-modal__section">
        <h3 className="pokemon-modal__subtitle">Abilities</h3>
        <ul className="pokemon-modal__list">
          {selectedPokemon.details?.abilities.map((ability, index) => (
            <li key={`ability_${index}`}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="pokemon-modal__section">
        <h3 className="pokemon-modal__subtitle">Moves</h3>
        <ul className="pokemon-modal__list">
          {selectedPokemon.details?.moves.slice(0, 5).map((move, index) => (
            <li key={`move_${index}`}>{move.move.name}</li>
          ))}
        </ul>
      </div>
      <div className="pokemon-modal__section">
        <h3 className="pokemon-modal__subtitle">Forms</h3>
        <ul className="pokemon-modal__list">
          {selectedPokemon.details?.forms.map((form, index) => (
            <li key={`form_${index}`}>{form.name}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};
