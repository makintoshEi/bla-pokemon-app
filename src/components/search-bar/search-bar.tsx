import { useFocus } from "hooks/useFocus";
import "./search-bar.css";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [search, setSearch] = useState("");
  const { currentRef } = useFocus<HTMLInputElement>();

  const handleSearch = (query: string) => {
    setSearch(query);
    onSearch(query);
  };

  return (
    <div className="search">
      <input
        ref={currentRef}
        tabIndex={0}
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
