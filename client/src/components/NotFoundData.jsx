import React from "react";
import { useTranslation } from "react-i18next";

const NotFoundData = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center">
      <p className="text-gray-900 dark:text-slate-50 text-lg sm:text-xl lg:text-2xl">
        {t("notFoundData")}
      </p>
    </div>
  );
};

export default NotFoundData;
