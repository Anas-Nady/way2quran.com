import React from "react";
import { useTranslation } from "react-i18next";

const HeadingSection = ({ nameSection }) => {
  const { t } = useTranslation();
  return (
    <h2 className="my-5 text-gray-700 text-lg sm:text-2xl font-bold  border-b-2 pb-1 border-dashed dark:text-slate-50 w-fit cursor-default">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {t(nameSection)}
      </span>
    </h2>
  );
};

export default HeadingSection;
