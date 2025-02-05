import React, { useEffect, useState } from "react";
import getName from "@/helpers/getNameForCurrentLang";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  downloadIcon,
  listenIcon,
  playIcon,
  shareIcon,
  playPauseIcon,
} from "../Icons";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import { usePlayer } from "@/contexts/PlayerContext";

type SurahDetailsCardProps = LocaleProps & {
  openPopup: (params?: string) => void;
  surahs: SurahAudioFile[];
  recitations: ReciterRecitation[];
  reciterName: string;
  playlist: Set<SurahAudioFile>;
  selectedRecitationSlug: string;
};

interface HandleListeningProps {
  url: string;
  reciterName: string;
  surahName: string;
  firstSurah: SurahAudioFile;
  isPlaylist: boolean;
}

const SurahDetailsCard: React.FC<SurahDetailsCardProps> = ({
  locale,
  openPopup,
  surahs,
  recitations,
  reciterName,
  playlist,
  selectedRecitationSlug,
}) => {
  const { playerState, storeSurahs, setPlayerState } = usePlayer();
  const [activeSurah, setActiveSurah] = useState({
    number: 0,
    isPaused: false,
  });
  const selectedRecitation = recitations?.find(
    (recitation) => recitation.recitationInfo.slug === selectedRecitationSlug
  );
  const selectedRecitationName = selectedRecitation
    ? getName(selectedRecitation.recitationInfo, locale)
    : "";

  const t = useTranslations("ReciterPage");
  const translations = {
    listening: t("listening"),
    download: t("download"),
    share: t("share"),
    topReciters: t("topReciters"),
    playingThePlaylist: t("playingThePlaylist"),
  };

  const router = useRouter();
  const [checkedStates, setCheckedStates] = useState<{
    [key: number]: boolean;
  }>({});

  // this useEffect to sync checkedStates with playlist
  useEffect(() => {
    const newCheckedStates: { [key: number]: boolean } = {};
    surahs.forEach((surah) => {
      newCheckedStates[surah.surahNumber] = playlist.has(surah);
    });
    setCheckedStates(newCheckedStates);
  }, [playlist, surahs]);

  const handleDownload = (downloadUrl: string) => {
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.click();
  };

  const handlePlaylist = (surah: SurahAudioFile) => {
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

    handleListening({
      url: firstAudio.url,
      reciterName,
      surahName: getName(firstAudio.surahInfo, locale),
      firstSurah: firstAudio,
      isPlaylist: true,
    });
    storeSurahs(extractPlaylist);

    // Reset all checkboxes & remove playlist
    resetPlaylist();
  };

  useEffect(() => {
    setActiveSurah({
      number: playerState.surahs[playerState.surahIndex]?.number,
      isPaused: playerState.isPaused,
    });
  }, [playerState.surahIndex, playerState.isPaused, playerState.surahs]);

  const handleListening = ({
    url,
    reciterName,
    surahName,
    firstSurah,
    isPlaylist,
  }: HandleListeningProps) => {
    if (playerState.currentTrack === url) {
      const btn = document.getElementsByClassName(
        "rhap_play-pause-button"
      )[0] as HTMLButtonElement | null;
      btn?.click();
      return;
    }

    const newPlayerState = {
      surahIndex: 0,
      isPlaying: true,
      isPlaylist,
      currentTrack: url,
      reciterName,
      surahName,
      recitationName: selectedRecitationName,
    };
    // If it's not a playlist, store the selected surah
    if (isPlaylist === false) {
      storeSurahs([firstSurah]);
    }
    setPlayerState((prev: PlayerState) => ({ ...prev, ...newPlayerState }));
  };

  const handleSharePopup = (params: string) => {
    resetPlaylist();
    openPopup(params);
  };

  const checkIfActiveSurah = (surah: SurahAudioFile) => {
    return (
      reciterName === playerState.reciterName &&
      selectedRecitationName === playerState.recitationName &&
      activeSurah.number === surah.surahNumber
    );
  };

  useEffect(() => {
    playlist.add(surahs[0]);
  }, []);

  return (
    <>
      {surahs.map((surah) => {
        const isPaused = activeSurah.isPaused;
        const isActive = checkIfActiveSurah(surah);

        return (
          <div
            id={surah.surahInfo.slug}
            key={surah.surahInfo.slug}
            className={`one bg-gray-50 border-2 dark:bg-slate-700 border-slate-200 dark:border-gray-600 hover:scale-[1.01] z-10 duration-100 flex justify-between p-3 flex-wrap gap-3`}
          >
            <div className="flex items-center justify-center flex-1 gap-4">
              <Checkbox
                labelText=""
                checked={!!checkedStates[surah.surahNumber]}
                onChange={() => handlePlaylist(surah)}
              />
              <div
                className="flex items-center flex-1 gap-4 cursor-pointer"
                onClick={() =>
                  router.push(
                    `/${locale}/surahs/${surah.surahInfo.slug}?recitationSlug=${selectedRecitationSlug}`
                  )
                }
              >
                <div className="flex items-center justify-center w-10 h-10 text-gray-900 rotate-45 bg-green-300 border rounded-sm dark:bg-green-800 border-slate-500 dark:text-white">
                  <span className="block text-center -rotate-45 font-english">
                    {surah.surahNumber}
                  </span>
                </div>
                <h2
                  className={`surah-name min-w-[100px] text-lg sm:text-xl lg:text-2xl font-semibold ${
                    isActive
                      ? "text-green-500 dark:text-green-400"
                      : "text-gray-700 dark:text-slate-50"
                  }`}
                >
                  {getName(surah.surahInfo, locale)}
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-2 mx-auto text-gray-800 buttons sm:flex-row dark:text-white sm:mx-0 md:w-fit">
              <Button
                className={`${
                  isActive &&
                  "border-green-500 text-green-600 font-semibold dark:text-green-400 dark:border-green-500"
                } px-5 py-3 w-full sm:w-[33%] justify-center sm:justify-between`}
                onClick={() =>
                  handleListening({
                    url: surah.url,
                    reciterName,
                    surahName: getName(surah.surahInfo, locale),
                    firstSurah: surah,
                    isPlaylist: false,
                  })
                }
              >
                {translations.listening}{" "}
                {isPaused && isActive ? playPauseIcon : listenIcon}
              </Button>
              <Button
                className="px-5 py-3 w-full sm:w-[33%] justify-center sm:justify-between"
                onClick={() => handleDownload(surah.downloadUrl)}
              >
                {translations.download} {downloadIcon}
              </Button>

              <Button
                className="px-5 py-3 w-full sm:w-[33%] justify-center sm:justify-between"
                onClick={() =>
                  handleSharePopup(`surahs/${surah.surahInfo.slug}`)
                }
              >
                {translations.share} {shareIcon}
              </Button>
            </div>
          </div>
        );
      })}
      {playlist.size > 1 && (
        <div className="fixed bottom-0 z-50 min-w-[230px] font-bold text-gray-100 translate-x-1/2 right-1/2">
          <div
            className="relative flex items-center justify-center gap-2 px-4 py-2 mx-auto text-lg duration-200 bg-green-600 rounded cursor-pointer sm:text-xl lg:text-2xl hover:bg-green-500"
            onClick={handlingRunningPlaylist}
          >
            <span>{playIcon}</span>
            <span>{translations.playingThePlaylist}</span>
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
};

export default SurahDetailsCard;
