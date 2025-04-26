import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaVolumeUp, FaTimes, FaShareAlt } from "react-icons/fa";

const SearchResults = () => {
  const { query } = useParams();
  const [news, setNews] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    if (query) fetchNews();
  }, [query]);

  const fetchWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const city = "sathyamangalam"; // Change this to any city you want
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const { data } = await axios.get(url);
      setWeather({
        temp: data.main.temp,
        condition: data.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        city: data.name,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const shareNews = (platform, title, url) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    let shareLink = "";
    switch (platform) {
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodedTitle} - ${encodedUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "x":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      default:
        return;
    }
    window.open(shareLink, "_blank");
  };

  return (
    <motion.div className={`min-h-screen p-6 transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <nav className="fixed top-0 left-0 w-full h-16 text-white px-4 z-50 bg-gray-800 p-4 mb-5 shadow-lg flex justify-between items-center rounded-b-lg">
        <h2 className="text-white text-xl font-bold">The Digital Daily</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="text-3xl p-2 rounded-full shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-110">
          {darkMode ? <MdLightMode className="text-yellow-400" /> : <MdDarkMode className="text-gray-700" />}
        </button>
      </nav>

      {/* Weather Section */}
      {weather && (
        <motion.div className="fixed top-16 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 border border-gray-300 z-50">
          <img src={weather.icon} alt={weather.condition} className="w-8 h-8" />
          <div className="text-sm">
            <p className="font-semibold">{weather.city}</p>
            <p>{Math.floor(weather.temp)}°C</p>
          </div>
        </motion.div>
      )}

      <div className="pt-24">
        {/* Header */}
        <motion.h1
          className={`text-4xl font-extrabold text-center mb-10 drop-shadow-lg ${darkMode ? "text-white" : "text-black"}`}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          🔍 Search Results for "{query}"
        </motion.h1>

        {/* News Display */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {news.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300 text-center col-span-3">Loading ...</p>
          ) : (
            news.map((article, index) => (
              <motion.div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/150"}
                  alt="News"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{article.description || "No description available."}</p>

                {/* Speaker Button */}
                <button
                  onClick={() => {
                    const speech = new SpeechSynthesisUtterance(article.title);
                    speech.lang = "en-US";
                    speech.rate = 0.85;
                    speech.pitch = 1.1;
                    window.speechSynthesis.speak(speech);
                  }}
                  className="mt-3 p-2 rounded-full bg-gray-600 text-white text-lg hover:bg-gray-700"
                >
                  <FaVolumeUp />
                </button>

                {/* Enlarge Button */}
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="mt-3 ml-2 p-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                >
                  Enlarge
                </button>

                {/* Share Button */}
                <button
                  onClick={() => shareNews("whatsapp", article.title, article.url)}
                  className="mt-3 ml-2 p-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                >
                  <FaShareAlt className="w-5 h-5" />
                </button>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Enlarged Newspaper View */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                className="relative bg-white dark:bg-gray-900 p-8 w-3/4 max-w-3xl h-5/6 overflow-y-auto shadow-xl newspaper-format"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 2 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500"
                  onClick={() => setSelectedIndex(null)}
                >
                  <FaTimes />
                </button>
                <h1 className={`text-3xl font-bold text-center uppercase underline ${darkMode ? "text-white" : "text-black"}`}>
                  {news[selectedIndex]?.title}
                </h1>
                <img
                  src={news[selectedIndex]?.urlToImage || "https://via.placeholder.com/600"}
                  className="w-full my-5 rounded-lg shadow-md"
                />
                <p className="text-justify text-lg leading-relaxed">
                  {news[selectedIndex]?.content || "Full content not available."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchResults;