"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReciterImg from "@/components/Reciter/ReciterImg";
import getName from "@/helpers/getNameForCurrentLang";
import TopReciterBadge from "@/components/Reciter/TopReciterBadge";
import { eyeIcon } from "@/components/Icons";
import { getReciterDetails } from "@/actions/reciters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorAlert from "@/components/common/ErrorAlert";
import SurahListCard from "@/components/Surah/SurahListCard";

interface PreviewReciterPageProps {
  params: {
    slug: string;
    locale: "ar" | "en";
  };
}

const PreviewReciterPage: React.FC<PreviewReciterPageProps> = ({
  params: { locale, slug },
}) => {
  const [recitations, setRecitations] = useState<ReciterRecitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reciter, setReciter] = useState<ReciterProfile | null>(null);
  const [selectedRecitationSlug, setSelectedRecitationSlug] = useState("");
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const res = await getReciterDetails({
      reciterSlug: slug,
      increaseViews: false,
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      setIsLoading(false);
      return;
    }

    setReciter(data.reciter);
    setRecitations(data.reciter.recitations);
    setSelectedRecitationSlug(data.reciter.recitations[0]?.recitationInfo.slug);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    !isLoading && (
      <div>
        {reciter && (
          <div className="grid justify-center mx-auto place-content-center sm:flex-row max-w-screen-2xl">
            <div className="img-reciter">
              <ReciterImg src={reciter.photo} alt={getName(reciter, locale)} />
            </div>
            <div className="info-reciter flex-col sm:flex-row gap-1 sm:flex-1 max-w-[100%] flex sm:justify-between">
              <div className="data-reciter flex items-center sm:items-start w-full mx-auto mt-[-10px] sm:my-2 flex-col">
                <h1 className="flex items-center gap-2 my-1 text-lg font-semibold text-gray-900 capitalize sm:text-xl sm:my-3 lg:text-2xl xl:text-4xl dark:text-white">
                  <span className="font-english">{reciter.number} - </span>
                  <span>{getName(reciter, locale)}</span>
                </h1>

                {reciter?.isTopReciter && <TopReciterBadge />}
                <span className="flex items-center justify-between gap-1 mb-1 text-sm font-semibold font-english lg:text-lg">
                  {eyeIcon}
                  {reciter.totalViewers?.toLocaleString()}
                </span>
                <div className="flex gap-2 w-[200px] md:w-[300px]">
                  <select
                    value={selectedRecitationSlug}
                    onChange={(e) => setSelectedRecitationSlug(e.target.value)}
                    className="bg-gray-50 border mb-2.5 h-fit p-3 text-xl w-full border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  >
                    <option
                      disabled={true}
                      value=""
                      className="text-xl dark:bg-gray-900"
                    ></option>
                    {recitations &&
                      recitations?.length > 0 &&
                      recitations?.map((recitation) => (
                        <option
                          value={recitation.recitationInfo.slug}
                          key={recitation.recitationInfo.slug}
                          className="flex items-center justify-between text-xl dark:bg-gray-900"
                        >
                          <span>
                            {getName(recitation.recitationInfo, locale)}
                          </span>
                          <span className="">
                            {recitation?.audioFiles?.length > 0 &&
                              ` - ${recitation?.audioFiles?.length} ${
                                locale == "en" ? "File" : "ملف"
                              }`}
                          </span>
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="my-5 recitations">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {recitations.map((recitation) => {
              if (recitation.recitationInfo.slug === selectedRecitationSlug) {
                if (recitation.audioFiles && recitation.audioFiles.length > 0) {
                  return recitation.audioFiles.map((surah) => (
                    <SurahListCard
                      surah={surah.surahInfo}
                      locale={locale}
                      key={surah.surahInfo.slug}
                    />
                  ));
                }
              }
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default PreviewReciterPage;
