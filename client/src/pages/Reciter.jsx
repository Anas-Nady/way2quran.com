import React, { useState, useEffect } from "react";
import {
  clipboardCheckIcon,
  closeIcon,
  downloadIcon,
  listenIcon,
  shareIcon,
  starIcon,
} from "../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { getReciterProfileReset } from "../redux/slices/reciterSlice";
import SocialMediaShareBtn from "../components/SocialMediaShareBtn";
import { useTranslation } from "react-i18next";
import { getReciterProfile } from "../redux/actions/reciterAction";
import { ErrorAlert, HelmetConfig, NotFoundData, Spinner } from "../components";
import { useParams } from "react-router-dom";

const Reciter = ({ updateAudioPlayerData }) => {
  const handleListening = (url) => {
    localStorage.setItem("url", url);
    localStorage.setItem("isVisible", true);

    // Update the data in AudioPlayer
    updateAudioPlayerData({
      url,
      isVisible: true,
    });
  };
  // const location = useLocation();
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [copyURLText, setCopyURLText] = useState(false);
  const [pageURLToShare, setPageURLToShare] = useState(window.location.href);
  const { recitationSlug, reciterSlug } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const { loading, reciterInfo, listSurahs, success, error } = useSelector(
    (state) => state.getReciterProfile
  );

  const reciterName =
    currentLang == "en"
      ? reciterInfo.name
      : reciterInfo.name_ar || window.location.host;

  const handlePopup = (id) => {
    setPageURLToShare(window.location.href);
    setPageURLToShare((prev) => `${prev}${id}`);
    setPopup(!popup);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(pageURLToShare);
    setCopyURLText(!copyURLText);

    setTimeout(() => {
      setCopyURLText(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch(getReciterProfile(recitationSlug || "hafs-an-asim", reciterSlug));
    localStorage.setItem("isVisible", false);

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    // Check if there is a hash in the URL
    const hash = window.location.hash.substring(1);
    if (success) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Scroll to the element
          const buttons = element.lastChild;
          const listenBtn = buttons.firstChild;
          listenBtn.click();
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [dispatch, recitationSlug, reciterSlug]);

  useEffect(() => {
    // Add or remove the class on the body element based on the popup state
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popup]);

  useEffect(() => {
    if (error) {
      dispatch(getReciterProfileReset());
    }
  }, [dispatch]);

  return (
    <>
      <HelmetConfig title={reciterName} />
      <div>
        <div
          className={`popup ${
            popup ? "flex" : "hidden"
          } fixed top-0 left-0 w-full h-full bg-slate-600 bg-opacity-95 z-50 justify-center items-center`}
        >
          <div className="p-4 md:p-5 text-center z-50 border-2 dark:border-gray-500 border-gray-100 bg-slate-200 dark:bg-gray-900 text-slate-50 w-[500px] relative">
            <span
              className="absolute -top-2 -left-1.5 w-8 h-8 cursor-pointer bg-slate-200 text-black border-black dark:bg-gray-900 dark:text-white dark:border-white border rounded-full flex justify-center items-center"
              onClick={() => handlePopup("")}
            >
              {closeIcon}
            </span>
            <div className="flex flex-col gap-2 items-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  {shareIcon}
                </div>
                <input
                  type="text"
                  id="input-group-1"
                  value={pageURLToShare}
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <SocialMediaShareBtn
              pageURL={pageURLToShare}
              handleClosePopup={handleClosePopup}
            />

            <button
              type="button"
              onClick={handleCopyURL}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              <div className="flex justify-center gap-2 items-center">
                {copyURLText ? `Copied URL` : `Copy URL`}
                {copyURLText && <span>{clipboardCheckIcon}</span>}
              </div>
            </button>
          </div>
        </div>
        <div className="container min-h-screen p-6">
          <div className="bg-slate-200 dark:bg-slate-800 sm:max-w-screen-2xl shadow-lg mx-auto p-3">
            {loading ? (
              <Spinner />
            ) : error ? (
              <ErrorAlert error={error} />
            ) : (
              success && (
                <>
                  <div className="my-2 sm:my-5 flex flex-col sm:flex-row m-auto gap-4 h-fit">
                    <div className="img-reciter block mx-auto min-w-[200px] h-[150px] max-w-[120px] sm:max-w-[250px]  sm:h-[185px]">
                      <img
                        src={reciterInfo.photo}
                        alt="name"
                        className="w-full h-full rounded-lg sm:rounded object-contain "
                      />
                    </div>
                    <div className="info-reciter flex-col sm:flex-row gap-1 sm:flex-1 max-w-[100%] flex  sm:justify-between">
                      <div className="data-reciter flex items-center sm:items-start w-full mx-auto mt-[-10px] sm:my-8  flex-col">
                        <h1 className="text-sm sm:text-lg my-1 sm:my-3  capitalize  lg:text-xl xl:text-2xl text-gray-900 dark:text-white font-semibold">
                          {reciterName}
                        </h1>
                        <div className="text-white flex gap-1 items-center">
                          {reciterInfo.topReciter && (
                            <>
                              <span className="text-yellow-300">
                                {starIcon}
                              </span>
                              <span className="text-sm font-semibold text-gray-900 dark:text-slate-50">
                                {t("topReciters")}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <button className="flex flex-col justify-between sm:items-center gap-2 my-2 sm:my-12">
                        <div className="text-gray-900 cursor-pointer border border-slate-400 bg-slate-200  hover:bg-slate-300 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 duration-200 rounded-lg p-2 w-[120px] sm:px-3 sm:py-2 sm:w-32 text-center">
                          {t("downloadAll")}
                        </div>
                        <button
                          onClick={() => handlePopup("")}
                          className="text-gray-900 cursor-pointer border border-slate-400 bg-slate-200  hover:bg-slate-300 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 duration-200 rounded-lg p-2 w-[120px] sm:px-3 sm:py-2 sm:w-32 text-center"
                        >
                          {t("share")}
                        </button>
                      </button>
                    </div>
                  </div>

                  <div className="recitations ">
                    <div className="grid grid-cols-1 gap-2">
                      {listSurahs &&
                        listSurahs.map((surahInfo, i) => (
                          <div
                            key={i}
                            id={surahInfo.translation}
                            className="one bg-gray-100 dark:bg-slate-700 shadow-md  hover:scale-[1.01] z-10 duration-100 cursor-pointer flex justify-between p-3 flex-wrap gap-3 "
                          >
                            <div className="flex gap-4 items-center ">
                              <div className="w-10 h-10 bg-green-200 text-gray-900  dark:bg-green-800 border border-slate-500 flex justify-center items-center rotate-45 rounded-sm dark:text-white">
                                <span className="-rotate-45 block text-center mt-[3px] rtl:me-[3px]">
                                  {surahInfo.number}
                                </span>
                              </div>

                              <h2 className="surah-name font-semibold font-notoNaskhArabic text-gray-900 dark:text-slate-50">
                                {currentLang == "en"
                                  ? `${surahInfo.translation} "${surahInfo.name}"`
                                  : `سورة ${surahInfo.name_ar}`}
                              </h2>
                            </div>
                            <div className="buttons flex flex-col sm:flex-row justify-between items-center gap-2 text-gray-800 dark:text-white mx-auto sm:mx-0 w-full sm:w-fit">
                              <button
                                className="flex gap-1 px-5 py-3 text-gray-900 dark:text-slate-50 bg-slate-200  border border-slate-400 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 duration-200 rounded-lg font-bold w-full sm:w-[33%]  justify-center sm:justify-between"
                                onClick={() => handleListening(surahInfo.url)}
                              >
                                {t("listening")}
                                <span className="">{listenIcon}</span>
                              </button>
                              <a
                                href={surahInfo.downloadUrl}
                                className="flex gap-1 px-5 py-3 text-gray-900 dark:text-slate-50 bg-slate-200  border border-slate-400 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 duration-200 rounded-lg font-bold w-full sm:w-[33%]  justify-center sm:justify-between"
                              >
                                {t("download")}
                                <span className="">{downloadIcon}</span>
                              </a>
                              <button
                                className="flex gap-1 px-5 py-3 text-gray-900 dark:text-slate-50 bg-slate-200  border border-slate-400 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 duration-200 rounded-lg font-bold w-full sm:w-[33%]  justify-center sm:justify-between"
                                onClick={() =>
                                  handlePopup(`#${surahInfo.translation}`)
                                }
                              >
                                {t("share")}
                                <span className="">{shareIcon}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      {listSurahs?.length === 0 && <NotFoundData />}
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reciter;
