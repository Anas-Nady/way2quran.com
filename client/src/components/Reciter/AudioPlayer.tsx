"use client";
import React, { useEffect } from "react";
import { closeSolidIcon, downArrowIcon, upArrowIcon } from "../Icons";
import Player from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "@/contexts/PlayerContext";
import { loopIcon } from "@/components/Icons";

const AudioPlayer: React.FC = () => {
  const {
    playerState,
    setPlayerState,
    closeAudio,
    togglePlayerExpansion,
    handleAudioEnded,
  } = usePlayer();

  const handleLoopClick = () => {
    setPlayerState((prev: PlayerState) => ({
      ...prev,
      loopback: !prev.loopback,
    }));
  };

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      const keyMap: { [key: string]: string } = {
        Space: "rhap_play-pause-button",
        ArrowLeft: "rhap_rewind-button",
        ArrowRight: "rhap_forward-button",
      };
      const buttonClass = keyMap[e.code];
      const target = e.target as HTMLElement;

      if (buttonClass && playerState.isPlaying && target.tagName !== "INPUT") {
        e.preventDefault();

        const btn = document.getElementsByClassName(
          buttonClass
        )[0] as HTMLButtonElement | null;
        btn?.click();
      }
    };
    document.addEventListener("keydown", handleKeypress);

    return () => document.removeEventListener("keydown", handleKeypress);
  }, [playerState.isPlaying]);

  return (
    <div
      className={`fixed border-2 border-gray-200 dark:border-gray-600 bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/3 2xl:w-[1477px] z-40 transition-transform duration-500 ease-in-out ${
        !playerState.isPlaying && "translate-y-full"
      } ${playerState.isExpanded && "translate-y-[60%]"}`}
    >
      <span
        className={`bg-gray-500 dark:bg-gray-700 rounded-lg top-0 right-0 flex justify-center items-center text-white dark:text-white cursor-pointer absolute font-bold mx-auto text-center ${
          !playerState.isPlaying && "hidden"
        }`}
        onClick={closeAudio}
      >
        {closeSolidIcon}
      </span>

      <span
        className={`bg-gray-500 dark:bg-gray-700 rounded-lg top-1 left-1 flex justify-center items-center text-white dark:text-white cursor-pointer absolute font-bold mx-auto text-center ${
          !playerState.isPlaying && "hidden"
        }`}
        onClick={togglePlayerExpansion}
      >
        {playerState.isExpanded ? upArrowIcon : downArrowIcon}
      </span>

      <div className="flex flex-col items-center justify-center p-2 text-gray-700 border-b-2 border-b-slate-300 dark:border-b-slate-500 dark:text-white bg-slate-100 dark:bg-slate-600">
        <h2 className="text-lg font-semibold sm:text-lg md:text-xl 2xl:text-xl mx-7">
          {`${playerState.surahName} - ${playerState.reciterName}`}
        </h2>
        <p className="text-md lg:text-lg 2xl:text-xl">
          {playerState.recitationName}
        </p>
      </div>
      <Player
        src={playerState.currentTrack}
        autoPlay
        onEnded={handleAudioEnded}
        customAdditionalControls={[
          <div
            key="loop-button"
            onClick={handleLoopClick}
            style={{
              cursor: "pointer",
              color: playerState.loopback ? "#22c55e" : "gray", // Change color when loop is active
              marginLeft: "10px",
            }}
          >
            {loopIcon}
          </div>,
        ]}
        onPause={() =>
          setPlayerState((prev: PlayerState) => ({ ...prev, isPaused: false }))
        }
        onPlay={() =>
          setPlayerState((prev: PlayerState) => ({ ...prev, isPaused: true }))
        }
      />
    </div>
  );
};

export default AudioPlayer;
