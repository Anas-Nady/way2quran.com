interface ObjectProps {
  englishName: string;
  arabicName: string;
}

const getName = function (obj: ObjectProps, locale: "ar" | "en"): string {
  if (!obj) return "default name";

  if (locale === "en") {
    return obj.englishName;
  } else if (locale === "ar") {
    return obj.arabicName;
  }
  return "default name";
};

export default getName;
