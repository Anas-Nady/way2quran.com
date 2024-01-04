import React, { useState } from "react";
import { arrowDownIcon, arrowUpIcon, trashIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReciterRecitation,
  deleteReciterSurah,
} from "../redux/actions/reciterAction";
import { useParams } from "react-router-dom";

const Accordion = ({ recitation, i, isEditReciterPage = false }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { reciterSlug } = useParams();
  const currentLang = i18n.language;
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const { loading: loadingDeleteRecitation } = useSelector(
    (state) => state.deleteReciterRecitation
  );
  const { loading: loadingDeleteSurah } = useSelector(
    (state) => state.deleteReciterSurah
  );

  const handleToggle = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDeleteRecitation = async (recitationSlug) => {
    await dispatch(deleteReciterRecitation(reciterSlug, recitationSlug));
  };

  const handleDeleteSurah = async (recitationSlug, surahSlug) => {
    await dispatch(deleteReciterSurah(reciterSlug, recitationSlug, surahSlug));
  };

  return (
    <div className={`accordion-item  w-[450px]`}>
      <button
        type="button"
        className="accordion-button flex items-center justify-between p-5 w-full font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
        onClick={() => handleToggle(i)}
      >
        <h3 className="capitalize text-xl">
          {currentLang == "en" ? recitation.name : recitation.name_ar}
        </h3>
        <span className="duration-200 flex gap-1">
          {openAccordionIndex === i ? arrowUpIcon : arrowDownIcon}
          {isEditReciterPage && (
            <button
              disabled={loadingDeleteRecitation}
              onClick={() => handleDeleteRecitation(recitation.slug)}
              className={`${loadingDeleteRecitation && "opacity-50"} `}
            >
              {trashIcon}
            </button>
          )}
        </span>
      </button>
      <div className="accordion-body w-full">
        {openAccordionIndex === i && (
          <div className="p-5 border flex gap-2 flex-wrap border-b-0 bg-white border-gray-300 dark:border-gray-700 w-full dark:bg-gray-900 ">
            {recitation.listSurahData.map((surah, j) => (
              <span
                key={j}
                className="flex gap-1 bg-slate-100 border border-slate-300 dark:border-gray-700 dark:bg-gray-800 p-2 mt-2 rounded-sm font-roboto "
                dir="ltr"
              >
                <span>{surah.url.split("/").pop()}</span>
                {isEditReciterPage && (
                  <button
                    disabled={loadingDeleteSurah}
                    className={`${loadingDeleteSurah && "opacity-50"}`}
                    onClick={() =>
                      handleDeleteSurah(recitation.slug, surah.slug)
                    }
                  >
                    {trashIcon}
                  </button>
                )}
              </span>
            ))}
            {recitation.listSurahData.length == 0 && (
              <span className="p-2 mt-2 text-gray-900 dark:text-slate-50 bg-slate-200  dark:bg-gray-800">
                {t("notFoundData")}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
