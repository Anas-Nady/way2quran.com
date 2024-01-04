import React from "react";
import { useTranslation } from "react-i18next";

const TitleSite = () => {
  const { t } = useTranslation();
  return (
    <span className="self-center text-lg lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold capitalize -tracking-wider whitespace-nowrap dark:text-white">
      <span className="text-orange-500 dark:text-orange-500">
        {t("wayTo")}
        <span className="text-green-500 dark:text-green-500">
          {" "}
          {t("quran")}
        </span>
      </span>
    </span>
  );
};

export default TitleSite;
