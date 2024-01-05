const getTextTranslation = (currentLang, enText, arText) => {
  return currentLang === "ar" ? arText : enText;
};

export default getTextTranslation;
