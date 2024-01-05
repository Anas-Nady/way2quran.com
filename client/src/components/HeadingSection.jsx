import React from "react";
import { useTranslation } from "react-i18next";

const HeadingSection = ({ nameSection, name = "", isCentering = false }) => {
  const { t } = useTranslation();
  return (
    <h1
      className={`my-5 text-gray-700 text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl text-center ${
        isCentering && "mx-auto"
      } font-bold  border-b-2 pb-1 border-dashed dark:text-slate-50 w-fit cursor-default`}
    >
      <span className="text-orange-500 dark:text-orange-500">
        {t(nameSection)}
        {name}
      </span>
    </h1>
  );
};

export default HeadingSection;
