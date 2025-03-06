import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";

const Category = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      setNews(data.articles);
    };
    fetchNews();
  }, [category]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Category: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Category;
