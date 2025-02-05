"use client";
import React, { useEffect, useState } from "react";
import getName from "@/helpers/getNameForCurrentLang";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TopReciterBadge from "./TopReciterBadge";
import ReciterImg from "./ReciterImg";
import SharePopup from "./SharePopup";
import { eyeIcon } from "../Icons";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/Button";
import SurahDetailsCard from "../Surah/SurahDetailsCard";
import {
  COMPLETED_RECITATIONS,
  HAFS_AN_ASIM,
  VARIOUS_RECITATIONS,
} from "@/constants/Recitations";

type ReciterDetailsProps = LocaleProps & {
  reciter: ReciterProfile;
  recitations: ReciterRecitation[];
};

function getRecitationSlug(slug: string): string {
  return slug === VARIOUS_RECITATIONS || slug === COMPLETED_RECITATIONS
    ? HAFS_AN_ASIM
    : slug;
}

const ReciterDetails: React.FC<ReciterDetailsProps> = ({
  locale,
  reciter,
  recitations,
}) => {
  const t = useTranslations("ReciterPage");
  const translations = {
    share: t("share"),
    downloadAll: t("downloadAll"),
  };

  const router = useRouter();
  const pathname = usePathname();
  const reciterName = getName(reciter, locale);
  const playlist = new Set<SurahAudioFile>();

  const [popupVisibility, setPopupVisibility] = useState(false);
  const [pageURL, setPageURL] = useState("");
  const searchParams = useSearchParams();

  const recitationSlug =
    getRecitationSlug(searchParams.get("recitationSlug") || "") ||
    recitations[0]?.recitationInfo?.slug;

  const [selectedRecitationSlug, setSelectedRecitationSlug] =
    useState(recitationSlug);

  const [loading, setLoading] = useState(false);

  const downloadSelectedRecitation = async (
    reciterSlug: string,
    recitationSlug: string
  ) => {
    let baseURL = `${window.location.protocol}//${window.location.host}/api/recitations/download/${reciterSlug}/${recitationSlug}`;

    // Find the recitation with the matching slug
    const matchingRecitation = recitations.find(
      (rec) => rec.recitationInfo?.slug === recitationSlug
    );

    // Use the download URL if available
    if (matchingRecitation?.downloadURL) {
      baseURL = matchingRecitation.downloadURL;
    }

    const link = document.createElement("a");
    link.href = baseURL;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRecitationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRecitationSlug(e.target.value);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(`${pathname}?recitationSlug=${e.target.value}`);
    }, 100);
  };

  const openPopup = (params?: string): void => {
    setPageURL(
      `${window.location.protocol}//${window.location.host}/${locale}`
    );
    setPageURL((prev) => `${prev}/${params}`);
    setPopupVisibility((prev) => !prev);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };

  useEffect(() => {
    if (popupVisibility) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popupVisibility]);

  return (
    <div>
      <SharePopup
        pageURL={pageURL}
        popupVisibility={popupVisibility}
        openPopup={openPopup}
        closePopup={closePopup}
      />
      <div className="container min-h-screen p-3">
        <div className="p-3 mx-auto bg-white border shadow-lg dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
          <div className="flex flex-col gap-4 m-auto my-2 sm:my-5 sm:flex-row h-fit">
            <div className="block mx-auto rounded-full img-reciter">
              <ReciterImg src={reciter.photo} alt={reciterName} />
            </div>
            <div className="info-reciter flex-col sm:flex-row gap-1 sm:flex-1 max-w-[100%] flex  sm:justify-between">
              <div className="data-reciter flex items-center sm:items-start lg:items-center w-full mx-auto mt-[-10px] sm:my-2  flex-col">
                <h1 className="my-1 text-3xl font-semibold text-center text-gray-700 capitalize sm:my-3 sm:text-4xl sm:text-start xl:text-6xl dark:text-white">
                  {reciterName}
                </h1>
                {reciter.isTopReciter && <TopReciterBadge />}
                <div className="flex items-center justify-between gap-1 mb-1 text-sm font-semibold text-gray-700 dark:text-white lg:text-lg">
                  <span>{eyeIcon}</span>
                  <span className="rtl:mt-1 rtl:font-arabic ltr:font-english">
                    {reciter.totalViewers?.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2 w-[200px] md:w-[300px]">
                  {recitations.length > 1 ? (
                    <select
                      value={selectedRecitationSlug}
                      onChange={handleRecitationChange}
                      className="bg-gray-50 border mb-2.5 h-fit p-3 text-xl w-full border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    >
                      <option
                        disabled={true}
                        value=""
                        className="text-xl dark:bg-gray-900"
                      ></option>
                      {recitations.length > 0 &&
                        recitations.map((recitation) => (
                          <option
                            value={recitation.recitationInfo.slug}
                            key={recitation.recitationInfo.slug}
                            className="text-xl dark:bg-gray-900"
                          >
                            {getName(recitation.recitationInfo, locale)}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <div className="text-2xl w-full rounded-lg px-2 font-medium py-3 text-center dark:bg-gray-700 bg-slate-100 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-slate-200 ">
                      {getName(recitations[0].recitationInfo, locale)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-2 my-2 sm:items-center sm:my-12">
                <Button
                  className="p-2 w-[100px] sm:w-32"
                  onClick={() =>
                    downloadSelectedRecitation(
                      reciter.slug,
                      selectedRecitationSlug
                    )
                  }
                >
                  {translations.downloadAll}
                </Button>
                <Button
                  onClick={() =>
                    openPopup(
                      `reciters/${reciter.slug}?recitationSlug=${selectedRecitationSlug}`
                    )
                  }
                  className="p-2 w-[90px] sm:w-32"
                >
                  {translations.share}
                </Button>
              </div>
            </div>
          </div>
          <div className="recitations">
            <div className="grid grid-cols-1 gap-2">
              {loading ? (
                <LoadingSpinner />
              ) : (
                recitations.map((recitation) => {
                  if (
                    recitation.recitationInfo.slug === selectedRecitationSlug
                  ) {
                    if (
                      recitation.audioFiles &&
                      recitation.audioFiles.length > 0
                    ) {
                      return (
                        <SurahDetailsCard
                          key={recitation.recitationInfo.slug}
                          reciterName={reciterName}
                          locale={locale}
                          recitations={recitations}
                          surahs={recitation.audioFiles}
                          openPopup={openPopup}
                          selectedRecitationSlug={selectedRecitationSlug}
                          playlist={playlist}
                        />
                      );
                    }
                  }
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReciterDetails;
