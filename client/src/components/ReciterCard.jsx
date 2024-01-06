import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import getTextTranslation from "../utils/getTextTranslation";
import { useTranslation } from "react-i18next";
import ImgReciter from "./ImgReciter";

const ReciterCard = ({ slug, name, name_ar, photo }) => {
  const { i18n } = useTranslation();

  const reciterName = getTextTranslation(i18n.language, name, name_ar);

  return (
    <Link to={`${slug}`} title={reciterName}>
      <div className="card transform transition-transform hover:-translate-y-1 duration-300">
        <div className="w-full px-2 min-w-[250px] min-h-[236px] max-w-[300px] bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-1 pt-4"></div>
          <div className="flex flex-col items-center pb-5">
            <span className="mb-2 ">
              <ImgReciter photoDisplay={photo} alt={reciterName} />
            </span>
            <h2 className="my-1 text-center text-xl line-clamp-1 max-w-[180px] capitalize font-medium text-gray-900 dark:text-white">
              {reciterName}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReciterCard;
