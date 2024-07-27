const getName = function (obj, currentLang) {
  if (!obj) return "default name";

  if (currentLang === "en") {
    return obj.englishName;
  } else if (currentLang === "ar") {
    return obj.arabicName;
  }
  return "default name";
};

export default getName;
