// src/pages/MapPage.jsx
import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapPage = () => {
  const mapContainer = useRef(null);
  const [news, setNews] = useState([]);

  const fetchNews = async (countryCode = 'us') => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
      const { data } = await axios.get(url);
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    if (mapContainer.current) {
      const map = L.map(mapContainer.current).setView([20, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      map.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
          const countryCode = response.data?.address?.country_code;
          if (countryCode) {
            fetchNews(countryCode);
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);
        }
      });
    }
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div ref={mapContainer} style={{ height: '50vh', width: '100vw' }} />
      <div style={{ height: '50vh', overflowY: 'auto', padding: '1rem' }}>
        {news && news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default MapPage;