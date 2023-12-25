// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en.json";
import arTranslation from "./ar.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

const savedLanguage = JSON.parse(localStorage.getItem("language-site")) || "ar";

if (savedLanguage == "ar") document.documentElement.setAttribute("dir", "rtl");
else document.documentElement.removeAttribute("dir");

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
