import { useState } from "react";

const SearchBar = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();

    if (!trimmedCity) return;
    if (trimmedCity.length < 2) {
      alert("City name must be at least 2 characters.");
      return;
    }

    fetchWeather(trimmedCity);
    setCity("");
  };

  return (
    <form className="flex gap-0 rounded-2xl overflow-hidden" onSubmit={handleSubmit}>
      <input
        id="city-search-input"
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input flex-1 px-6 py-4 rounded-l-2xl text-white text-lg"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        id="search-btn"
        type="submit"
        className="search-btn text-white px-8 py-4 rounded-r-2xl text-lg"
        aria-label="Search weather"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
