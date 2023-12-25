import React from "react";
import { useTranslation } from "react-i18next";

const TitleSite = () => {
  const { t } = useTranslation();
  return (
    <span className="self-center text-lg lg:text-2xl font-semibold whitespace-nowrap dark:text-white">
      <div dangerouslySetInnerHTML={{ __html: t("titleSite") }} />
    </span>
  );
};

export default TitleSite;
