"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import getName from "@/utils/getNameForCurrentLang";

export default function SelectOptions({
  value,
  onChange,
  options,
  placeholder,
  required = true,
  optionDisabled = true,
  currentLang,
  loadingData = false,
}) {
  return (
    <div className="flex gap-2 w-[200px] md:w-[300px]">
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-50 border mb-2.5 h-fit p-3 text-xl w-full border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
      >
        <option
          disabled={optionDisabled}
          value=""
          className="text-xl dark:bg-gray-900"
        >
          {placeholder}
        </option>
        {options &&
          options?.length > 0 &&
          options?.map((option, i) => (
            <option
              value={option.slug}
              key={i}
              className="text-xl dark:bg-gray-900"
            >
              {option?.number}
              {" - "}
              {getName(option, currentLang)}
              {option?.label || ""}
            </option>
          ))}
      </select>

      {loadingData && <LoadingSpinner />}
    </div>
  );
}
