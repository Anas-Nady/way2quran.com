import React from "react";
import { useTranslation } from "react-i18next";

const TextAreaInput = ({ id, value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-5 max-w-full">
      <label
        htmlFor={id}
        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        {t("textarea")}
      </label>
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={onChange}
        className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={t("textareaPlaceholder")}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
