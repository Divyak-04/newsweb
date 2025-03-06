import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NewsCard = ({ article }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detects when dark mode is toggled
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Check dark mode initially
    checkDarkMode();

    // Listen for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      whileHover={{
        scale: 1.00,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        borderColor: "#3b82f6",
      }}
      className={`relative border rounded-lg overflow-hidden transition-all duration-300 ease-in-out cursor-pointer
        ${isDarkMode ? "bg-gray-900 text-black border-gray-600" : "bg-white text-black border-gray-300"}`}
    >
      {/* News Image */}
      <img
        src={article.urlToImage || "https://via.placeholder.com/300"}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      {/* News Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-2">{article.title}</h2>
        <p className="text-sm mt-2 line-clamp-3">
          {article.description || "No description available."}
        </p>

        {/* Read More Button */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-blue-500 font-semibold hover:underline"
        >
          Read More →
        </a>
      </div>
    </motion.div>
  );
};

export default NewsCard;
