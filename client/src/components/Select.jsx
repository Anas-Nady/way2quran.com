import React from "react";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";

const Select = ({
  value = "",
  onChange,
  options,
  placeholder,
  loading = false,
  optionDisabled = true,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex gap-2 w-[300px]">
      {loading && <Spinner />}
      <select
        value={value}
        onChange={onChange}
        className="bg-gray-50 border mb-2.5 h-fit p-3 text-xl w-[300px] border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
      >
        <option
          disabled={optionDisabled}
          value=""
          className="dark:bg-gray-900 text-xl"
        >
          {t(placeholder)}
        </option>
        {options &&
          options.length > 0 &&
          options.map((option, i) => (
            <option
              value={option.slug}
              key={i}
              className="dark:bg-gray-900 text-xl"
            >
              {i18n.language === "en" ? option?.name : option?.name_ar || ""}
              {t(option?.label) || ""}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
