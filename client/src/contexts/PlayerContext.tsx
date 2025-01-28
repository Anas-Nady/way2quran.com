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
  isPlaylist: false,
  currentTrack: "",
  isPaused: false,
  surahIndex: -1,
  surahName: "",
  reciterName: "",
  recitationName: "",
  isExpanded: false,
  surahs: [],
  loopback: false,
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
    const { surahIndex, isPlaylist, loopback, surahs } = playerState;

    let nextIndex: number;

    if (!isPlaylist) {
      // Handle non-playlist mode
      if (!loopback) return; // If loopback is disabled, do nothing

      // Force the player to restart the current surah
      const currentSurah = surahs[surahIndex];
      setPlayerState((prev) => ({
        ...prev,
        currentTrack: "", // Clear the current track to force a reload
      }));

      // Use a timeout to ensure the state update is processed before reloading the track
      setTimeout(() => {
        setPlayerState((prev) => ({
          ...prev,
          currentTrack: currentSurah.url,
          surahIndex: surahIndex, // Keep the same index
          surahName: getName(currentSurah, locale),
        }));
      }, 0);

      return; // Exit the function after handling loopback
    } else {
      // Handle playlist mode
      if (loopback) {
        // Loopback is enabled: go to the next surah or wrap around to the first
        nextIndex = surahIndex === surahs.length - 1 ? 0 : surahIndex + 1;
      } else {
        // Loopback is disabled: stop at the end of the playlist
        if (surahIndex === surahs.length - 1) return;
        nextIndex = surahIndex + 1;
      }
    }

    // Update player state with the next surah
    const nextSurah = surahs[nextIndex];
    setPlayerState((prev) => ({
      ...prev,
      currentTrack: nextSurah.url,
      surahIndex: nextIndex,
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
