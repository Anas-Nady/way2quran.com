import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReciterProfileReset } from "../redux/slices/reciterSlice";
import { useTranslation } from "react-i18next";
import { getReciterProfile } from "../redux/actions/reciterAction";
import {
  ErrorAlert,
  HelmetConfig,
  NotFoundData,
  Spinner,
  SurahContainer,
  SharePopup,
  Layout,
  ReciterInfoCard,
} from "../components";
import { useParams } from "react-router-dom";
import getTextTranslation from "../utils/getTextTranslation";

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

  const reciterName =
    getTextTranslation(
      i18n.language,
      reciterInfo?.name,
      reciterInfo?.name_ar
    ) || "";

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
      <Layout>
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
                    <ReciterInfoCard
                      reciterName={reciterName}
                      handlePopup={handlePopup}
                      reciterInfo={reciterInfo}
                      selectedRecitationType={selectedRecitationType}
                      changeSelectedRecitation={(e) =>
                        setSelectedRecitationType(e.target.value)
                      }
                      recitationsInfo={recitationsInfo}
                    />
                    <div className="recitations ">
                      <div className="grid grid-cols-1 gap-2">
                        {recitationsInfo.map((recitation) => {
                          if (recitation.slug === selectedRecitationType) {
                            if (
                              recitation.listSurahData &&
                              recitation.listSurahData.length > 0
                            ) {
                              return recitation.listSurahData.map(
                                (surah, i) => (
                                  <SurahContainer
                                    key={i}
                                    currentLang={currentLang}
                                    surahInfo={surah}
                                    handleListening={handleListening}
                                    handlePopup={handlePopup}
                                  />
                                )
                              );
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
      </Layout>
    </>
  );
};

export default Reciter;
