import React from "react";
import { useTranslation } from "react-i18next";

const HeadingSection = ({ nameSection, name = "", isCentering = false }) => {
  const { t } = useTranslation();
  return (
    <h1
      className={`my-5 text-gray-700 text-lg sm:text-2xl xl:text-3xl text-center ${
        isCentering && "mx-auto"
      } font-bold  border-b-2 pb-1 border-dashed dark:text-slate-50 w-fit cursor-default`}
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {t(nameSection)}
        {name}
      </span>
    </h1>
  );
};

export default HeadingSection;
