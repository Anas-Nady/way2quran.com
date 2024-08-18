"use client";
import ImgReciter from "./ImgReciter";
import SurahContainer from "./SurahContainer";
import { useEffect, useState } from "react";
import Button from "../Button";
import SharePopup from "./SharePopup";
import getName from "@/utils/getNameForCurrentLang";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";
import TopReciterBadge from "./TopReciterBadge";

export default function Reciter({
  currentLang,
  reciter,
  recitations,
  defaultRecitationSlug,
  listeningTxt,
  downloadTxt,
  shareTxt,
  downloadAllTxt,
  topRecitersTxt,
  playingThePlaylistTxt,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reciterName = getName(reciter, currentLang);
  const playlist = new Set();

  const [mounted, setMounted] = useState(false);
  const [popup, setPopup] = useState(false);
  const [pageURLToShare, setPageURLToShare] = useState("");
  const searchParams = useSearchParams();
  const recitationSlug =
    searchParams.get("recitationSlug") || defaultRecitationSlug;

  const [selectedRecitationSlug, setSelectedRecitationSlug] =
    useState(recitationSlug);

  const [loading, setLoading] = useState(false);

  const handleDownloadAllFiles = async (reciterSlug, recitationSlug) => {
    const link = document.createElement("a");
    const baseURL = `${window.location.protocol}//${window.location.host}/api/reciters/download-recitation/${reciterSlug}/${recitationSlug}`;
    link.setAttribute("href", baseURL);

    link.click();

    // Clean up
    link.remove();
  };

  const handlePopup = (id) => {
    setPageURLToShare(
      `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    );
    setPageURLToShare((prev) => `${prev}${id}${window.location.search}`);
    setPopup(!popup);
  };

  const changeSelectedRecitation = (e) => {
    setSelectedRecitationSlug(e.target.value);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(`${pathname}?recitationSlug=${e.target.value}`);
    }, 100);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popup]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <div>
          <SharePopup
            pageURLToShare={pageURLToShare}
            popup={popup}
            handlePopup={handlePopup}
            handleClosePopup={handleClosePopup}
          />
          <div className="container min-h-screen p-3">
            <div className="p-3 mx-auto bg-white border shadow-lg dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
              <div className="flex flex-col gap-4 m-auto my-2 sm:my-5 sm:flex-row h-fit">
                <div className="block mx-auto rounded-full img-reciter">
                  <ImgReciter
                    photoDisplay={reciter.photo}
                    alt={reciterName}
                    isBigger={true}
                  />
                </div>
                <div className="info-reciter flex-col sm:flex-row gap-1 sm:flex-1 max-w-[100%] flex  sm:justify-between">
                  <div className="data-reciter flex items-center sm:items-start lg:items-center w-full mx-auto mt-[-10px] sm:my-2  flex-col">
                    <h1 className="my-1 text-3xl font-semibold text-center text-gray-700 capitalize sm:my-3 sm:text-4xl sm:text-start xl:text-6xl dark:text-white">
                      {reciterName}
                    </h1>
                    {reciter.isTopReciter && <TopReciterBadge />}
                    <div className="flex gap-2 w-[200px] md:w-[300px]">
                      <select
                        value={selectedRecitationSlug}
                        onChange={changeSelectedRecitation}
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
                              {getName(recitation.recitationInfo, currentLang)}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-2 my-2 sm:items-center sm:my-12">
                    <Button
                      text={downloadAllTxt}
                      className="p-2 w-[100px] sm:w-32"
                      handleSubmit={() =>
                        handleDownloadAllFiles(
                          reciter.slug,
                          selectedRecitationSlug
                        )
                      }
                    />

                    <Button
                      text={shareTxt}
                      handleSubmit={() => handlePopup("")}
                      className="p-2 w-[90px] sm:w-32"
                    />
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
                        recitation.recitationInfo.slug ===
                        selectedRecitationSlug
                      ) {
                        if (
                          recitation.audioFiles &&
                          recitation.audioFiles.length > 0
                        ) {
                          return (
                            <SurahContainer
                              key={recitation.recitationInfo.slug}
                              reciterName={reciterName}
                              currentLang={currentLang}
                              recitations={recitations}
                              surahsInfo={recitation.audioFiles}
                              handlePopup={handlePopup}
                              listeningTxt={listeningTxt}
                              downloadTxt={downloadTxt}
                              playingThePlaylistTxt={playingThePlaylistTxt}
                              selectedRecitationSlug={selectedRecitationSlug}
                              shareTxt={shareTxt}
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
      </>
    )
  );
}
