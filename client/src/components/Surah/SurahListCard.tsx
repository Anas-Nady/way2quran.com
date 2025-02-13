import React from "react";
import getName from "@/helpers/getNameForCurrentLang";
import Link from "next/link";

interface SurahListCardProps extends LocaleProps {
  surah: SurahDetails;
}

const SurahListCard: React.FC<SurahListCardProps> = ({ surah, locale }) => {
  return (
    <Link
      className="w-full px-3 py-4 duration-200 border border-gray-300 rounded cursor-pointer surah dark:border-gray-700 hover:bg-gray-100 hover:dark:bg-gray-700"
      href={`/${locale}/surahs/${surah.slug}`}
      key={surah.slug}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 text-white rotate-45 bg-green-500 border rounded-sm dark:bg-green-800 border-slate-400 dark:border-gray-500 dark:text-white">
          <span className="block font-medium text-center -rotate-45 font-english">
            {surah.number}
          </span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 surah-name line-clamp-1 sm:text-xl lg:text-2xl dark:text-slate-50">
          {getName(surah, locale)}
        </h2>
      </div>
    </Link>
  );
};

export default SurahListCard;
