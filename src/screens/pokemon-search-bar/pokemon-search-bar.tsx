import "./pokemon-search-bar.css";
import SearchBar from "components/search-bar/search-bar";

interface PokemonSearchBarProps {
  onSearch: (query: string) => void;
}

export const PokemonSearchBar = ({ onSearch }: PokemonSearchBarProps) => {
  return (
    <div className="pokemon-search-bar">
      <SearchBar onSearch={onSearch} placeholder="Search pokemon" />
    </div>
  );
};
