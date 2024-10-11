"use client";
import React, { createContext, useContext, useState } from "react";
import getName from "@/helpers/getNameForCurrentLang";

interface PlayerContextProps {
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  togglePlayerExpansion: () => void;
  closeAudio: () => void;
  handleAudioEnded: () => void;
  storeSurahs: (surahs: SurahAudioFile[]) => void;
}

export const PlayerContext = createContext<PlayerContextProps | null>(null);

type PlayerProviderProps = LocaleProps & {
  children: React.ReactNode;
};

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context) {
    return context;
  }

  throw new Error("usePlayer must be used within a PlayerProvider");
}

const defaultPlayerState = {
  isPlaying: false,
  currentTrack: "",
  isPaused: false,
  surahNumber: 0,
  surahName: "",
  reciterName: "",
  recitationName: "",
  isExpanded: false,
  surahs: [],
};

const PlayerProvider: React.FC<PlayerProviderProps> = ({
  children,
  locale,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    ...defaultPlayerState,
  });

  const togglePlayerExpansion = (): void => {
    setPlayerState((prev) => ({ ...prev, isExpanded: !prev.isExpanded }));
  };

  const closeAudio = (): void => {
    setPlayerState({ ...defaultPlayerState });
  };

  const handleAudioEnded = (): void => {
    const prevSurah: SurahDetails | undefined = playerState.surahs.find(
      (surah: SurahDetails) => playerState.surahNumber === surah.number
    );

    if (
      !prevSurah ||
      prevSurah.number === 114 ||
      playerState.surahs[playerState.surahs.length - 1].number ===
        prevSurah.number
    ) {
      closeAudio();
      return;
    }

    const nextSurah: SurahDetails | undefined =
      playerState.surahs[playerState.surahs.indexOf(prevSurah) + 1];

    if (!nextSurah) {
      closeAudio();
      return;
    }

    setPlayerState((prev) => ({
      ...prev,
      currentTrack: nextSurah.url,
      surahNumber: nextSurah?.number,
      surahName: getName(nextSurah, locale),
    }));
  };

  const storeSurahs = (surahs: SurahAudioFile[]): void => {
    const storedSurahs: SurahDetails[] = surahs.map((surah) => ({
      number: surah.surahNumber,
      url: surah.url,
      slug: surah.surahInfo.slug,
      arabicName: surah.surahInfo.arabicName,
      englishName: surah.surahInfo.englishName,
    }));
    setPlayerState((prev) => ({ ...prev, surahs: storedSurahs }));
  };

  return (
    <PlayerContext.Provider
      value={{
        playerState,
        setPlayerState,
        togglePlayerExpansion,
        closeAudio,
        storeSurahs,
        handleAudioEnded,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
