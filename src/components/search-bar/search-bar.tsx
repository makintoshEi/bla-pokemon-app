import "./search-bar.css";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
    onSearch(query);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
        aria-label="Search Pokemon"
      />
    </div>
  );
};
