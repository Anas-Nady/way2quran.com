"use client";
import { arrowDownIcon, arrowUpIcon, trashIcon } from "@/components/Icons";
import ToastMessage from "@/components/ToastMessage";
import { deleteRecitation, deleteSurah } from "@/actions/reciters";
import { useState } from "react";
import NotFound from "./../../_components/NotFound";
import getName from "@/utils/getNameForCurrentLang";

export default function Accordion({
  reciterSlug,
  recitations,
  currentLang,
  notFoundDataTxt,
  recitationNumberTxt,
  confirmDeleteTxt,
  fileTxt,
}) {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reciterRecitations, setReciterRecitations] = useState(recitations);

  const [errorHappen, setErrorHappen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggle = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDeleteRecitation = async (e, reciterSlug, recitationSlug) => {
    e.stopPropagation(); // Prevent event propagation

    const result = confirm(confirmDeleteTxt);

    if (result) {
      setLoading(true);
      setErrorHappen(false);

      try {
        await deleteRecitation(reciterSlug, recitationSlug);

        setReciterRecitations((prevRecitations) =>
          prevRecitations.filter(
            (recitation) => recitation.recitationInfo.slug !== recitationSlug
          )
        );
      } catch (err) {
        const currentError =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;

        setErrorMessage(currentError);
        setErrorHappen(true);
      } finally {
        setLoading(false);
      }
    } else return;
  };

  const handleDeleteSurah = async (reciterSlug, recitationSlug, surahSlug) => {
    const result = confirm(confirmDeleteTxt);

    if (result) {
      setLoading(true);
      setErrorHappen(false);

      try {
        await deleteSurah(reciterSlug, recitationSlug, surahSlug);

        // Update reciterRecitations state by removing the deleted surah
        setReciterRecitations((prevRecitations) => {
          // Find the recitation that matches the recitationSlug
          const updatedRecitations = prevRecitations.map((recitation) => {
            if (recitation.recitationInfo.slug === recitationSlug) {
              // Remove the deleted surah from listSurahData
              const updatedListSurahData = recitation.audioFiles.filter(
                (surah) => surah.surahInfo.slug !== surahSlug
              );
              // Return the recitation object with updated listSurahData
              return { ...recitation, audioFiles: updatedListSurahData };
            }
            return recitation;
          });
          return updatedRecitations;
        });
      } catch (err) {
        const currentError =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;

        setErrorMessage(currentError);
        setErrorHappen(true);
      } finally {
        setLoading(false);
      }
    } else return;
  };

  return (
    <>
      {errorHappen && <ToastMessage error={true} message={errorMessage} />}
      <div className="flex flex-col gap-2">
        {reciterRecitations?.length > 0 && (
          <div className="text-lg md:text-xl xl:text-2xl">
            {recitationNumberTxt}
            {": "}
            <span className="font-bold text-green-500">
              {reciterRecitations.length}
            </span>
          </div>
        )}
        {reciterRecitations.map((recitation, i) => (
          <div className={`accordion-item w-full  sm:w-[520px]`} key={i}>
            <span
              className={`accordion-button cursor-pointer ${
                loading && "cursor-not-allowed"
              } flex items-center justify-between p-5 w-full font-medium rtl:text-right text-gray-600 border border-b-0 border-gray-300 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
              onClick={() => handleToggle(i)}
            >
              <h3 className="px-5 text-xl capitalize">
                {getName(recitation.recitationInfo, currentLang)}
              </h3>

              <div className="flex gap-2 duration-200">
                <div className="text-lg font-bold text-green-500">
                  {recitation?.audioFiles?.length || 0} {fileTxt}
                </div>
                {openAccordionIndex === i ? arrowUpIcon : arrowDownIcon}
                <button
                  disabled={loading}
                  className={`${loading && "opacity-40 cursor-not-allowed"}`}
                  onClick={(e) =>
                    handleDeleteRecitation(
                      e,
                      reciterSlug,
                      recitation.recitationInfo.slug
                    )
                  }
                >
                  {trashIcon}
                </button>
              </div>
            </span>
            <div className="w-full accordion-body">
              {openAccordionIndex === i && (
                <div className="p-5 border flex max-h-[310px] no-overflow-style overflow-y-auto gap-2 flex-wrap border-b-0 bg-white border-gray-300 dark:border-gray-700 w-full dark:bg-gray-900 ">
                  {recitation.audioFiles.map((surah) => (
                    <div
                      key={surah.surahInfo.slug}
                      className="flex gap-1 w-[110px] bg-slate-100 border border-slate-300 dark:border-gray-700 dark:bg-gray-800 p-2 mt-2 rounded-sm font-english "
                      dir="ltr"
                    >
                      <span>{surah.url.split("/").pop()}</span>
                      <button
                        disabled={loading}
                        className={`${
                          loading && "opacity-40 cursor-not-allowed"
                        }`}
                        onClick={() =>
                          handleDeleteSurah(
                            reciterSlug,
                            recitation.recitationInfo.slug,
                            surah.surahInfo.slug
                          )
                        }
                      >
                        {trashIcon}
                      </button>
                    </div>
                  ))}
                  {recitation.audioFiles.length == 0 && (
                    <NotFound notFoundDataTxt={notFoundDataTxt} />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
