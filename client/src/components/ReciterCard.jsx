import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReciterCard = ({ slug, name, name_ar, photo, recitations }) => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;
  const currentNameBasedOnLanguage = currentLang == "en" ? name : name_ar;

  return (
    <Link to={`${slug}`} title={currentNameBasedOnLanguage}>
      <div className="card transform transition-transform hover:-translate-y-1 duration-300">
        <div className="w-full px-2 min-w-[300px] min-h-[286px] max-w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-1 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <span className="w-[96px] h-[145px]">
              <img
                className="w-full mb-3 rounded-full shadow-lg object-cover"
                src={photo}
                alt="Bonnie image"
              />
            </span>
            <h5 className="mb-1 text-center text-xl line-clamp-1 capitalize font-medium text-gray-900 dark:text-white">
              {currentNameBasedOnLanguage}
            </h5>

            <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
              <button className="items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                {t("listeningNow")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReciterCard;
