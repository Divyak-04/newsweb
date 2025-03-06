import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setQuery }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setQuery(search); // Fetch news automatically
      navigate(`/search/${search}`);
    }
  };

  // Function for Voice Search 🎤
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      setQuery(transcript); // Auto-fetch news
      navigate(`/search/${transcript}`);
    };
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <input
        type="text"
        placeholder="Search news..."
        className="w-full md:w-1/2 p-3 border rounded-l-lg dark:bg-gray-800 dark:text-white focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 rounded-r-lg hover:bg-blue-700"
      >
        Search
      </button>

      {/* Voice Search Button 🎤 */}
      <button
        type="button"
        onClick={handleVoiceSearch}
        className="ml-3 bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-3 rounded-full hover:bg-gray-400"
      >
        🎤
      </button>
    </form>
  );
};

export default SearchBar;
