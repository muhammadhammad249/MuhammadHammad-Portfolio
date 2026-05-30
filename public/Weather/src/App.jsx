import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);

    if (!API_KEY || API_KEY === "demo" || API_KEY.trim() === "") {
      setError(
        "⚠️ API Key missing! Add VITE_API_KEY=your_key to .env.local and restart the dev server."
      );
      setLoading(false);
      return;
    }

    try {
      const url = `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("🔍 City not found. Please check the spelling and try again.");
      } else if (err.response?.status === 401) {
        setError("🔑 Invalid API Key. Please check your .env.local file.");
      } else if (err.code === "ERR_NETWORK") {
        setError("📡 Network error. Please check your internet connection.");
      } else {
        setError("⚠️ Something went wrong. Please try again.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>


      <div className="video-overlay absolute inset-0 z-[1]" />


      <div className="glass-card relative text-white p-10 w-full max-w-xl z-10 animate-fade-in-up">

        <div className="flex items-center justify-center gap-4 mb-10">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="url(#hdrSky)" />
            <defs>
              <linearGradient id="hdrSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#2d6fa8" />
              </linearGradient>
            </defs>
            <circle cx="36" cy="24" r="8" fill="#FFD700" />
            <ellipse cx="28" cy="40" rx="16" ry="8" fill="white" opacity="0.9" />
            <circle cx="20" cy="40" r="7" fill="white" opacity="0.9" />
            <circle cx="28" cy="36" r="9" fill="white" opacity="0.9" />
            <circle cx="37" cy="39" r="7" fill="white" opacity="0.9" />
          </svg>
          <h1 className="text-4xl font-bold tracking-tight">Weather App</h1>
        </div>
        <SearchBar fetchWeather={fetchWeather} />
        {loading && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="loader-dot" />
            <div className="loader-dot" />
            <div className="loader-dot" />
          </div>
        )}

        {error && !loading && (
          <div className="mt-5 p-4 rounded-xl bg-red-500/15 border border-red-400/30 text-red-300 text-sm text-center leading-relaxed animate-fade-in-up">
            {error}
          </div>
        )}

        {weather && !loading && <WeatherCard weather={weather} />}

        {!weather && !loading && !error && (
          <p className="text-center text-white/40 text-xs mt-6">
            Search any city to see live weather
          </p>
        )}
      </div>

      <p className="absolute bottom-4 text-white/30 text-xs z-10">
        Powered by OpenWeatherMap
      </p>
    </div>
  );
}

export default App;