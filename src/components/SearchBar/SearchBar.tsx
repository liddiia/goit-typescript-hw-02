import { useState, FormEvent, ChangeEvent } from "react";
import css from "../SearchBar/SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }
    onSearch(query);
    setQuery("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className={css.searchPlace}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          name="input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
        <button className={css.searchButton} type="submit">
          Search
        </button>
      </form>
      <Toaster position="top-left" reverseOrder={false} />
    </header>
  );
};

export default SearchBar;

