import React, { useState, useEffect } from "react";
import { starIcon } from "../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { getReciterProfileReset } from "../redux/slices/reciterSlice";
import { useTranslation } from "react-i18next";
import { getReciterProfile } from "../redux/actions/reciterAction";
import {
  ErrorAlert,
  HelmetConfig,
  NotFoundData,
  Spinner,
  Button,
  SurahContainer,
  SharePopup,
  SelectRecitation,
} from "../components";
import { useParams } from "react-router-dom";
// import axios from "axios";

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
  const [pageURLToShare, setPageURLToShare] = useState(window.location.href);
  const { recitationSlug, reciterSlug } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [loadingDownloadingFolder, setLoadingDownloadingFolder] =
    useState(false);

  const { loading, success, recitationsInfo, reciterInfo, error } = useSelector(
    (state) => state.getReciterProfile
  );

  // const handleDownloadAllFiles = async () => {
  //   try {
  //     setLoadingDownloadingFolder(true);
  //     // Make a GET request to the server endpoint
  //     const { data } = await axios.get("/api/reciters/download");

  //     // Create a Blob from the response data
  //     const blob = new Blob([data], { type: "application/zip" });

  //     console.log(blob);
  //     // Create a link element and trigger a download
  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = "downloaded-folder.zip";
  //     link.click();
  //   } catch (error) {
  //     console.error("Error downloading folder:", error);
  //   } finally {
  //     setLoadingDownloadingFolder(false);
  //   }
  // };

  const reciterName =
    currentLang == "en"
      ? reciterInfo?.name
      : reciterInfo?.name_ar || window.location.host;

  const [selectedRecitationType, setSelectedRecitationType] = useState(
    recitationSlug || "hafs-an-asim"
  );

  const handlePopup = (id) => {
    setPageURLToShare(window.location.href);
    setPageURLToShare((prev) => `${prev}${id}`);
    setPopup(!popup);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };

  useEffect(() => {
    dispatch(getReciterProfile(reciterSlug));

    localStorage.setItem("isVisible", false);
    console.log(selectedRecitationType);

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

    console.log(selectedRecitationType);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [dispatch, recitationSlug, reciterSlug, selectedRecitationType]);

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
        <SharePopup
          pageURLToShare={pageURLToShare}
          popup={popup}
          handlePopup={handlePopup}
          handleClosePopup={handleClosePopup}
        />
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
                        className="w-full h-full rounded-lg sm:rounded object-fill "
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

                        <SelectRecitation
                          currentLang={currentLang}
                          recitations={recitationsInfo}
                          selectedRecitationType={selectedRecitationType}
                          setSelectedRecitationType={setSelectedRecitationType}
                        />
                      </div>

                      <div className="flex flex-col justify-between sm:items-center gap-2 my-2 sm:my-12">
                        <Button
                          text="downloadAll"
                          className="p-2 w-[100px] sm:w-32"
                          // handleSubmit={handleDownloadAllFiles}
                          disabled={loadingDownloadingFolder}
                        />

                        <Button
                          text="share"
                          handleSubmit={() => handlePopup("")}
                          className="p-2 w-[100px] sm:w-32"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="recitations ">
                    <div className="grid grid-cols-1 gap-2">
                      {recitationsInfo.map((recitation) => {
                        if (recitation.slug === selectedRecitationType) {
                          if (
                            recitation.listSurahData &&
                            recitation.listSurahData.length > 0
                          ) {
                            return recitation.listSurahData.map((surah, i) => (
                              <SurahContainer
                                key={i}
                                currentLang={currentLang}
                                surahInfo={surah}
                                handleListening={handleListening}
                                handlePopup={handlePopup}
                              />
                            ));
                          } else {
                            return <NotFoundData key={recitation.slug} />;
                          }
                        }
                      })}
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
