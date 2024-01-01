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

  const { loading, success, recitationsInfo, reciterInfo, error } = useSelector(
    (state) => state.getReciterProfile
  );

  const handleDownloadAllFiles = (reciterSlug, recitationSlug) => {
    const a = document.createElement("a");
    const baseURL = `http${process.env.NODE_ENV !== "development" && "s"}://${
      window.location.host
    }/api/reciters/download/${reciterSlug}/${recitationSlug}`;
    a.setAttribute("href", baseURL);
    a.click();
  };

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

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleKeydown);

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
    console.log(reciterInfo);
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
        <div className="container min-h-screen p-3">
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
                      <div className="data-reciter flex items-center sm:items-start lg:items-center w-full mx-auto mt-[-10px] sm:my-2  flex-col">
                        <h1 className="text-lg my-1 sm:my-3  capitalize md:text-xl  lg:text-2xl xl:text-3xl text-gray-900 dark:text-white font-semibold">
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
                          handleSubmit={() =>
                            handleDownloadAllFiles(
                              reciterInfo.slug,
                              selectedRecitationType
                            )
                          }
                        />

                        <Button
                          text="share"
                          handleSubmit={() => handlePopup("")}
                          className="p-2 w-[90px] sm:w-32"
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
