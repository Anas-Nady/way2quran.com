"use client";
import { useEffect, useState } from "react";
import { closeSolidIcon, downArrowIcon, upArrowIcon } from "../Icons";
import Player from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import getName from "@/utils/getNameForCurrentLang";

const AudioPlayer = ({ currentLang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [number, setNumber] = useState("");
  const [surahName, setSurahName] = useState("");
  const [reciterName, setReciterName] = useState("");
  const [recitationName, setRecitationName] = useState("");
  const [isOpenOnScreen, setIsOpenOnScreen] = useState(true);

  const handleOpenPlayer = () => {
    setIsOpenOnScreen(!isOpenOnScreen);
  };

  const closeAudio = () => {
    setUrl("");
    setIsVisible(false);
    setReciterName("");
    setRecitationName("");
    setIsOpenOnScreen(true);
    window.sessionStorage.removeItem("playerSettings");
    window.sessionStorage.removeItem("surahs");
  };

  const handleAudioEnded = () => {
    const surahs = JSON.parse(sessionStorage.getItem("surahs")) || [];

    for (let i = 0; i < surahs.length; i++) {
      if (number == +surahs[i].number) {
        if (
          +surahs[i].number < 114 &&
          surahs[surahs.length - 1].number !== surahs[i].number
        ) {
          const nextSurahName = getName(surahs[i + 1], currentLang);
          setSurahName(nextSurahName);

          const playerSettings =
            JSON.parse(sessionStorage.getItem("playerSettings")) || {};
          sessionStorage.setItem(
            "playerSettings",
            JSON.stringify({
              ...playerSettings,
              src: surahs[i + 1].src,
              number: surahs[i + 1].number,
              surahName: nextSurahName,
            })
          );
          window.dispatchEvent(new Event("session"));
        } else return;
      }
    }
  };

  useEffect(() => {
    const handleVisibility = () => {
      const playerSettingsJSON = sessionStorage.getItem("playerSettings");
      if (playerSettingsJSON) {
        try {
          const playerSettings = JSON.parse(playerSettingsJSON);
          const playerIsVisible = playerSettings?.isVisible || 0;
          if (playerIsVisible > 1) {
            setIsVisible(true);
            setUrl(playerSettings.src);
            setReciterName(playerSettings.reciterName);
            setNumber(playerSettings.number);
            setSurahName(playerSettings.surahName);
            setRecitationName(playerSettings.recitationName);
          }
        } catch (error) {
          console.error("Error parsing playerSettings JSON:", error);
        }
      }
    };

    // Add an event listener for the visibility change event
    window.addEventListener("session", handleVisibility);

    handleVisibility();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("session", handleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/3 2xl:w-[1477px] z-50 transition-transform duration-500 ease-in-out ${
        !isVisible && "translate-y-full"
      } ${!isOpenOnScreen && "translate-y-[60%]"}`}
    >
      <span
        className={`bg-gray-700 rounded-lg top-0 right-0 flex justify-center items-center text-white cursor-pointer absolute font-bold mx-auto text-center ${
          !isVisible && "hidden"
        }`}
        onClick={closeAudio}
      >
        {closeSolidIcon}
      </span>

      <span
        className={`bg-gray-700 rounded-lg top-1 left-1 flex justify-center items-center text-white cursor-pointer absolute font-bold mx-auto text-center ${
          !isVisible && "hidden"
        }`}
        onClick={handleOpenPlayer}
      >
        {isOpenOnScreen ? downArrowIcon : upArrowIcon}
      </span>

      <div className="flex flex-col items-center justify-center p-2 border-b-2 bg-slate-600 border-slate-500">
        <h2 className="text-lg text-white sm:text-lg md:text-xl 2xl:text-xl mx-7">
          {`${surahName} - ${reciterName}`}
        </h2>
        <p className="text-white text-md lg:text-lg 2xl:text-xl">
          {recitationName}
        </p>
      </div>
      <Player src={url} autoPlay onEnded={handleAudioEnded} />
    </div>
  );
};

export default AudioPlayer;
