import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { latestNews: "Latest News" } },
    hi: { translation: { latestNews: "ताज़ा खबरें" } },
    ta: { translation: { latestNews: "சமீபத்திய செய்திகள்" } },
    es: { translation: { latestNews: "Últimas noticias" } },
    fr: { translation: { latestNews: "Dernières nouvelles" } },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
