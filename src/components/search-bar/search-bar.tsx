import "./search-bar.css";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
    onSearch(query);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
        aria-label={placeholder}
      />
    </div>
  );
}
