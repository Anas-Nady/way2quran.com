"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { leftArrowIcon, rightArrowIcon } from "../Icons";

const SurahNavigationLink = ({
  currentSurahSlug,
  surah,
  locale,
  direction,
}) => {
  if (!surah) return null;

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const recitationSlug = searchParams.get("recitationSlug");
  const newPathname = pathname.replace(currentSurahSlug, surah.slug);
  const newUrl = `${newPathname}${
    recitationSlug ? `?recitationSlug=${recitationSlug}` : ""
  }`;
  const surahName = locale === "ar" ? surah.arabicName : surah.englishName;

  const getIcon = () => {
    if (locale === "ar") {
      return direction === "right" ? rightArrowIcon : leftArrowIcon;
    }
    return direction === "left" ? rightArrowIcon : leftArrowIcon;
  };

  return (
    <Link
      href={newUrl}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-gray-800 hover:bg-white bg-gray-100 dark:bg-gray-800 duration-200 border border-gray-300 dark:border-gray-500 rounded cursor-pointer dark:text-white text-md sm:text-xl 2xl:text-2xl dark:hover:bg-gray-700 ${
        direction === "left" ? "flex-row-reverse" : ""
      }`}
    >
      <span className="mt-1.5">{getIcon()}</span>
      <span>{surahName}</span>
    </Link>
  );
};

export default SurahNavigationLink;
