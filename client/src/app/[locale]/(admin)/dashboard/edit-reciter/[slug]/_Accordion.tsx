"use client";
import React, { useState } from "react";
import { arrowDownIcon, arrowUpIcon, trashIcon } from "@/components/Icons";
import ToastMessage from "@/components/ui/ToastMessage";
import { deleteRecitation, deleteSurah } from "@/actions/reciters";
import getName from "@/helpers/getNameForCurrentLang";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/ui/EmptyState";
import getErrorMessage from "@/helpers/getErrorMessage";

type AccordionProps = LocaleProps & {
  reciterSlug: string;
  recitations: ReciterRecitation[];
};

type State = {
  openAccordionIndex: number | null;
  loading: boolean;
  recitationsList: ReciterRecitation[];
  error: string;
};

const Accordion: React.FC<AccordionProps> = ({
  reciterSlug,
  recitations,
  locale,
}) => {
  const t = useTranslations("EditReciterPage");

  const [state, setState] = useState<State>({
    openAccordionIndex: null,
    loading: false,
    recitationsList: recitations,
    error: "",
  });

  const handleToggle = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      openAccordionIndex: prevState.openAccordionIndex === index ? null : index,
    }));
  };

  const handleDeleteRecitation = async (
    e: React.MouseEvent,
    reciterSlug: string,
    recitationSlug: string
  ) => {
    e.stopPropagation(); // Prevent event propagation

    const result = confirm(t("confirmDelete"));

    if (result) {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        await deleteRecitation(reciterSlug, recitationSlug);

        setState((prevState) => ({
          ...prevState,
          recitationsList: prevState.recitationsList.filter(
            (recitation) => recitation.recitationInfo.slug !== recitationSlug
          ),
        }));
      } catch (err: unknown) {
        setState((prev) => ({ ...prev, error: getErrorMessage(err) }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  };

  const handleDeleteSurah = async (
    reciterSlug: string,
    recitationSlug: string,
    surahSlug: string,
    audioName: string
  ) => {
    const result = confirm(t("confirmDelete"));

    if (result) {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        await deleteSurah(reciterSlug, recitationSlug, surahSlug, audioName);

        setState((prevState) => ({
          ...prevState,
          recitationsList: prevState.recitationsList.map((recitation) => {
            if (recitation.recitationInfo.slug === recitationSlug) {
              return {
                ...recitation,
                audioFiles: recitation.audioFiles.filter(
                  (surah) => surah.surahInfo.slug !== surahSlug
                ),
              };
            }
            return recitation;
          }),
        }));
      } catch (err: unknown) {
        setState((prev) => ({ ...prev, error: getErrorMessage(err) }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  };

  return (
    <>
      {state.error && <ToastMessage error={true} message={state.error} />}
      <div className="flex flex-col gap-2">
        {state.recitationsList?.length > 0 && (
          <div className="text-lg md:text-xl xl:text-2xl">
            {t("recitationNumber")}
            {": "}
            <span className="font-bold text-green-500">
              {state.recitationsList.length}
            </span>
          </div>
        )}
        {state.recitationsList.map((recitation, i) => (
          <div className={`accordion-item w-full  sm:w-[520px]`} key={i}>
            <span
              className={`accordion-button cursor-pointer ${
                state.loading && "cursor-not-allowed"
              } flex items-center justify-between p-5 w-full font-medium rtl:text-right text-gray-600 border border-b-0 border-gray-300 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
              onClick={() => handleToggle(i)}
            >
              <h3 className="px-5 text-xl capitalize">
                {getName(recitation.recitationInfo, locale)}
              </h3>

              <div className="flex gap-2 duration-200">
                <div className="text-lg font-bold text-green-500">
                  {recitation?.audioFiles?.length || 0} {t("file")}
                </div>
                {state.openAccordionIndex === i ? arrowUpIcon : arrowDownIcon}
                <button
                  disabled={state.loading}
                  className={`${
                    state.loading && "opacity-40 cursor-not-allowed"
                  }`}
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
              {state.openAccordionIndex === i && (
                <div className="p-5 border flex max-h-[310px] no-overflow-style overflow-y-auto gap-2 flex-wrap border-b-0 bg-white border-gray-300 dark:border-gray-700 w-full dark:bg-gray-900 ">
                  {recitation.audioFiles.map((surah: SurahAudioFile) => (
                    <div
                      key={surah.surahInfo.slug}
                      className="flex gap-1 w-[110px] bg-slate-100 border border-slate-300 dark:border-gray-700 dark:bg-gray-800 p-2 mt-2 rounded-sm font-english "
                      dir="ltr"
                    >
                      <span>{surah.url.split("/").pop()}</span>
                      <button
                        disabled={state.loading}
                        className={`${
                          state.loading && "opacity-40 cursor-not-allowed"
                        }`}
                        onClick={() =>
                          handleDeleteSurah(
                            reciterSlug,
                            recitation.recitationInfo.slug,
                            surah.surahInfo.slug,
                            surah.url.split("/")?.pop() || ""
                          )
                        }
                      >
                        {trashIcon}
                      </button>
                    </div>
                  ))}
                  {recitation.audioFiles.length == 0 && <EmptyState />}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accordion;
