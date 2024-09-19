"use client";

import { downloadIcon, listenIcon, playIcon, shareIcon } from "../Icons";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";
import getName from "@/utils/getNameForCurrentLang";
import { useState, useEffect } from "react";

export const handleSession = (surahs) => {
  // This ensures the code only runs in the browser environment
  const sessionSurahs = [];

  for (let i = 0; i < surahs.length; i++) {
    sessionSurahs.push({
      number: surahs[i].surahNumber,
      src: surahs[i].url,
      arabicName: surahs[i].surahInfo.arabicName,
      englishName: surahs[i].surahInfo.englishName,
    });
  }
  window.sessionStorage.removeItem("surahs");
  window.sessionStorage.setItem("surahs", JSON.stringify(sessionSurahs));
};

export default function SurahContainer({
  currentLang,
  handlePopup,
  surahsInfo,
  recitations,
  reciterName,
  listeningTxt,
  downloadTxt,
  shareTxt,
  playingThePlaylistTxt,
  playlist,
  selectedRecitationSlug,
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [checkedStates, setCheckedStates] = useState({});

  // this useEffect to sync checkedStates with playlist
  useEffect(() => {
    const newCheckedStates = {};
    surahsInfo.forEach((surah) => {
      newCheckedStates[surah.surahNumber] = playlist.has(surah);
    });
    setCheckedStates(newCheckedStates);
  }, [playlist, surahsInfo]);

  const handleDownload = (downloadUrl) => {
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.click();
  };

  const handlePlaylist = (surah) => {
    setCheckedStates((prev) => ({
      ...prev,
      [surah.surahNumber]: !prev[surah.surahNumber] || false,
    }));

    if (playlist.has(surah)) {
      playlist.delete(surah);
    } else {
      playlist.add(surah);
    }
  };

  const resetPlaylist = () => {
    playlist.clear();
    setCheckedStates({});
  };

  const handlingRunningPlaylist = () => {
    const extractPlaylist = Array.from(playlist.values());
    const firstAudio = extractPlaylist[0];

    handleListening(
      firstAudio.url,
      reciterName,
      getName(firstAudio.surahInfo, currentLang),
      firstAudio.surahNumber
    );
    handleSession(extractPlaylist);

    // Reset all checkboxes & remove playlist
    resetPlaylist();
  };

  const handleListening = (url, reciterName, surahName, number) => {
    const selectedRecitation = recitations?.find(
      (recitation) => recitation.recitationInfo.slug === selectedRecitationSlug
    );

    const recitationName = getName(
      selectedRecitation.recitationInfo,
      currentLang
    );

    const playerSettings = {
      number,
      isVisible: 2,
      src: url,
      reciterName,
      surahName,
      recitationName,
    };
    handleSession(surahsInfo);
    sessionStorage.setItem("playerSettings", JSON.stringify(playerSettings));
    window.dispatchEvent(new Event("session"));
  };

  // Modify handlePopup to reset the playlist
  const handleSharePopup = (id) => {
    resetPlaylist();
    handlePopup(id);
  };

  return (
    <>
      {surahsInfo.map((surah) => (
        <div
          id={surah.surahInfo.slug}
          key={surah.surahInfo.slug}
          className="one bg-gray-50 border-2 border-slate-200 dark:border-gray-600 dark:bg-slate-700 hover:scale-[1.01] z-10 duration-100 flex justify-between p-3 flex-wrap gap-3 "
        >
          <div className="flex items-center justify-center flex-1 gap-4">
            <input
              type="checkbox"
              onChange={() => handlePlaylist(surah)}
              checked={!!checkedStates[surah.surahNumber]}
              className="w-6 h-6 bg-gray-100 border-gray-300 rounded"
            />
            <div
              className="flex items-center flex-1 gap-4 cursor-pointer"
              onClick={() =>
                router.push(
                  `${pathName}/${surah.surahInfo.slug}?recitationSlug=${selectedRecitationSlug}`
                )
              }
            >
              <div className="flex items-center justify-center w-10 h-10 text-gray-900 rotate-45 bg-green-300 border rounded-sm dark:bg-green-800 border-slate-500 dark:text-white">
                <span className="block text-center -rotate-45 font-english">
                  {surah.surahNumber}
                </span>
              </div>
              <h2 className="surah-name min-w-[100px] text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-slate-50">
                {getName(surah.surahInfo, currentLang)}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between w-full gap-2 mx-auto text-gray-800 buttons sm:flex-row dark:text-white sm:mx-0 md:w-fit">
            <Button
              text={listeningTxt}
              className="flex gap-1 px-5 py-3 w-full sm:w-[33%]  justify-center sm:justify-between"
              icon={listenIcon}
              handleSubmit={() =>
                handleListening(
                  surah.url,
                  reciterName,
                  getName(surah.surahInfo, currentLang),
                  surah.surahNumber
                )
              }
            />
            <Button
              text={downloadTxt}
              className="flex gap-1 px-5 py-3 w-full sm:w-[33%]  justify-center sm:justify-between"
              icon={downloadIcon}
              handleSubmit={() => handleDownload(surah.downloadUrl)}
            />
            <Button
              text={shareTxt}
              className="flex gap-1 px-5 py-3 w-full sm:w-[33%]  justify-center sm:justify-between"
              icon={shareIcon}
              handleSubmit={() => handleSharePopup(`/${surah.surahInfo.slug}`)}
            />
          </div>
        </div>
      ))}
      {playlist.size > 1 && (
        <div className="fixed bottom-0 z-50 min-w-[230px] font-bold text-gray-100 translate-x-1/2 right-1/2">
          <div
            className="relative flex items-center justify-center gap-2 px-4 py-2 mx-auto text-lg duration-200 bg-green-600 rounded cursor-pointer sm:text-xl lg:text-2xl hover:bg-green-500"
            onClick={handlingRunningPlaylist}
          >
            <span>{playIcon}</span>
            <span>{playingThePlaylistTxt}</span>
          </div>
          <span className="absolute -left-1 w-6 h-6 leading-[24px] text-center font-english font-bold px-1 text-sm bg-green-600 border border-green-400 rounded-full -top-3">
            {playlist.size}
          </span>
          <span
            className="absolute -right-1 w-6 h-6 leading-[24px] cursor-pointer hover:bg-red-600 hover:border-none hover:text-white text-center font-english font-bold px-1 text-sm bg-green-600 border border-green-400 rounded-full -top-3"
            onClick={resetPlaylist}
          >
            X
          </span>
        </div>
      )}
    </>
  );
}
