"use client";
import React from "react";
import { closeSolidIcon, downArrowIcon, upArrowIcon } from "../Icons";
import Player from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "@/contexts/PlayerContext";

const AudioPlayer: React.FC = () => {
  const { playerState, closeAudio, togglePlayerExpansion, handleAudioEnded } =
    usePlayer();

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
      />
    </div>
  );
};

export default AudioPlayer;
