"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button";
import ImgReciter from "../Reciter/ImgReciter";
import SharePopup from "../Reciter/SharePopup";
import { starIcon } from "../Icons";
import { handleSession } from "../Reciter/SurahContainer";
import getName from "@/utils/getNameForCurrentLang";

export default function HeaderInfo({
  translation,
  locale,
  reciter,
  surah,
  recitationName,
  surahNumber,
}) {
  const [popup, setPopup] = useState(false);
  const [pageURLToShare, setPageURLToShare] = useState("");

  const surahName = getName(surah, locale);
  const reciterName = getName(reciter, locale);

  const handlePopup = () => {
    setPageURLToShare(
      `${window.location.protocol}//${window.location.host}${window.location.pathname}${window.location.search}`
    );
    setPopup(!popup);
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

  const handleDownload = (downloadUrl) => {
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.click();

    anchor.remove();
  };

  const handleListening = (url, reciterName, surahName, number) => {
    const playerSettings = {
      number,
      isVisible: 2,
      src: url,
      reciterName,
      recitationName,
      surahName,
    };
    handleSession([]);
    sessionStorage.setItem("playerSettings", JSON.stringify(playerSettings));
    window.dispatchEvent(new Event("session"));
  };

  return (
    <div className="border-b-2 border-slate-300 dark:border-gray-700">
      <SharePopup
        pageURLToShare={pageURLToShare}
        popup={popup}
        handlePopup={handlePopup}
        handleClosePopup={handleClosePopup}
      />
      <div>
        <div className="flex flex-col gap-4 m-auto my-2 sm:my-5 sm:flex-row h-fit">
          <div className="block mx-auto rounded-full img-reciter">
            <ImgReciter
              photoDisplay={reciter.photo}
              alt={reciterName}
              isBigger={true}
            />
          </div>
          <div className="info-reciter flex-col sm:flex-row gap-1 sm:flex-1 max-w-[100%] flex sm:justify-between">
            <div className="data-reciter flex justify-between items-center sm:items-start lg:items-center w-full mx-auto mt-[-10px] sm:my-2  flex-col">
              <div className="flex flex-col items-center justify-center">
                <h1 className="my-1 text-4xl font-semibold text-center text-gray-700 capitalize sm:my-3 lg:text-5xl sm:text-start xl:text-6xl dark:text-white">
                  {reciterName}
                </h1>
                {reciter.isTopReciter && (
                  <div className="flex items-center gap-1 mb-2 text-white">
                    <>
                      <span className="text-yellow-300">{starIcon}</span>
                      <span className="text-lg font-semibold text-gray-900 dark:text-slate-50">
                        {translation.topRecitersTxt}
                      </span>
                    </>
                  </div>
                )}
                <div className="flex gap-2 w-[200px] md:w-[300px] cursor-default">
                  <p className="block w-full px-3 py-2 mt-2 text-xl text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 h-fit dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {recitationName}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-2 my-2 sm:items-center sm:my-12">
              <Button
                text={translation.listeningTxt}
                className="p-2 w-[100px] sm:w-32"
                handleSubmit={() =>
                  handleListening(
                    surah.url,
                    reciterName,
                    surahName,
                    surahNumber
                  )
                }
              />
              <Button
                text={translation.downloadTxt}
                handleSubmit={() => handleDownload(surah.downloadUrl)}
                className="p-2 w-[90px] sm:w-32"
              />
              <Button
                text={translation.shareTxt}
                handleSubmit={() => handlePopup()}
                className="p-2 w-[90px] sm:w-32"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex justify-center pb-1 mx-auto text-2xl font-semibold text-gray-700 sm:-mt-11 dark:border-gray-700 dark:text-white sm:text-3xl 2xl:text-4xl">
          <span>{surahName}</span>
        </div>
      </div>
    </div>
  );
}
