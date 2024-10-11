import React from "react";
import { ayatQuranFont } from "@/fonts/index";
import { bismillahArabicSVG } from "../Icons";
import SurahNavLink from "./SurahNavLink";

type SurahVersesProps = LocaleProps & {
  surah: SurahDetails;
  verses: SurahVerse[];
  nextSurah: SurahDetails;
  prevSurah: SurahDetails;
};

const SurahVerses: React.FC<SurahVersesProps> = ({
  locale,
  surah,
  verses,
  nextSurah,
  prevSurah,
}) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      {surah.slug !== "at-tawbah" && (
        <div className="flex items-center justify-center pt-5">
          {bismillahArabicSVG}
        </div>
      )}
      {verses.map((verse) => (
        <div
          className="flex px-4 gap-2 pb-5 my-10 border-b-2 dark:border-gray-700 items-center text-[25px] sm:text-3xl xl:text-4xl 2xl:text-[40px] text-gray-800 dark:text-slate-200"
          key={verse.id}
        >
          <div className="w-full">
            <div dir="rtl">
              <span className="mb-1 leading-normal aya-arabic font-arabic">
                {verse.textArabic}
                <span
                  className={`${ayatQuranFont.className} text-[40px] sm:text-5xl 2xl:text-6xl`}
                >
                  {verse.id}
                </span>
              </span>
            </div>
            {locale === "en" && (
              <div dir="ltr">
                <span className="mb-1 leading-normal aya-arabic font-english">
                  {verse.textEnglish}
                  <span
                    className={`${ayatQuranFont.className} text-[40px] sm:text-5xl 2xl:text-6xl`}
                  >
                    {verse.id}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className={`${!prevSurah && "invisible"}`}>
          <SurahNavLink locale={locale} surah={prevSurah} direction={"right"} />
        </div>
        <div className={`${!nextSurah && "invisible"}`}>
          <SurahNavLink locale={locale} surah={nextSurah} direction={"left"} />
        </div>
      </div>
    </div>
  );
};

export default SurahVerses;
