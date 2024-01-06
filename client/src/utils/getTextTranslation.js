const getTextTranslation = (currentLang, enText, arText) => {
  return currentLang === "ar" ? arText : enText || "Way2quran";
};

export default getTextTranslation;
