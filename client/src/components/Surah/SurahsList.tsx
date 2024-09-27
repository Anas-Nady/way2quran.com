"use client";

import SurahListCard from "@/components/Surah/SurahListCard";
import SURAHS_LIST from "@/constants/SurahsList";
import { LocaleProps } from "@/types/types";
import { useSearchParams } from "next/navigation";
import React from "react";

const SurahsList: React.FC<LocaleProps> = ({ locale }) => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search")?.trim() || "";

  const matchingSurahs = SURAHS_LIST.filter((surah) => {
    if (!searchValue) return true;

    const regexEnglish = new RegExp(searchValue, "i");
    const regexArabic = new RegExp(searchValue.replace(/ا/g, "[اأإآ]"), "i");

    return (
      regexEnglish.test(surah.englishName) || regexArabic.test(surah.arabicName)
    );
  });

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {matchingSurahs.map((surah) => (
        <SurahListCard surah={surah} locale={locale} key={surah.slug} />
      ))}
    </div>
  );
};

export default SurahsList;
