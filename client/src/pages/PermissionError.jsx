import React from "react";
import { useTranslation } from "react-i18next";
import { wrongIcon } from "../components/Icons";

function PermissionError() {
  const { t } = useTranslation();
  return (
    <main className="bg-gray-50 dark:bg-gray-900 w-full">
      <div className="min-h-[70vh] max-w-[900px] flex justify-center items-center flex-col gap-4 mx-auto">
        <h3 className="flex text-lg items-center justify-between text-red-600 ">
          <span>{wrongIcon}</span>
          <span>{t("notAllowedToAccessThisPage")}</span>
        </h3>
      </div>
    </main>
  );
}

export default PermissionError;
