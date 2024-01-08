import React from "react";
import { useTranslation } from "react-i18next";

const HeadingSection = ({
  nameSection,
  name = "",
  isCentering = false,
  className = "",
}) => {
  const { t } = useTranslation();
  return (
    <h1
      className={`my-5 text-gray-700 text-3xl lg:text-4xl text-center ${
        isCentering && "mx-auto"
      } font-bold  border-b-2 pb-1 border-dashed dark:text-slate-50 w-fit cursor-default ${className}`}
      style={{ whiteSpace: "nowrap" }}
    >
      <span className="text-green-500 dark:text-green-500">
        {t(nameSection)}
        {name}
      </span>
    </h1>
  );
};

export default HeadingSection;
