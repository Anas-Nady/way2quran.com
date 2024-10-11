"use client";
import React from "react";
import Link from "next/link";
import { leftArrowIcon, rightArrowIcon } from "../Icons";

type SurahNavLinkProps = LocaleProps & {
  surah: SurahDetails;
  direction: "right" | "left";
};

const SurahNavLink: React.FC<SurahNavLinkProps> = ({
  surah,
  locale,
  direction,
}) => {
  if (!surah) return null;

  const surahName = locale === "ar" ? surah.arabicName : surah.englishName;

  const getIcon = (): React.ReactNode => {
    if (locale === "ar") {
      return direction === "right" ? rightArrowIcon : leftArrowIcon;
    }
    return direction === "left" ? rightArrowIcon : leftArrowIcon;
  };

  return (
    <Link
      href={`/${locale}/surahs/${surah.slug}`}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-gray-800 hover:bg-white bg-gray-100 dark:bg-gray-800 duration-200 border border-gray-300 dark:border-gray-500 rounded cursor-pointer dark:text-white text-md sm:text-xl 2xl:text-2xl dark:hover:bg-gray-700 ${
        direction === "left" ? "flex-row-reverse" : ""
      }`}
    >
      <span className="mt-1.5">{getIcon()}</span>
      <span>{surahName}</span>
    </Link>
  );
};

export default SurahNavLink;
