import React from "react";
import { useTranslation } from "react-i18next";

const TopReciterCheckBox = ({ checked, handleTopReciters }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center mb-4" onClick={handleTopReciters}>
      <input
        id="default-checkbox"
        type="checkbox"
        checked={checked}
        className="w-4 h-4 text-xl text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300"
      >
        {t("topReciters")}
      </label>
    </div>
  );
};

export default TopReciterCheckBox;
