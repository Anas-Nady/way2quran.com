import React from "react";
import { useTranslation } from "react-i18next";

const Input = ({
  labelText,
  placeholder,
  id,
  type,
  onChange,
  disabled,
  value,
  required = true,
  isAdmin = false,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className={`block mb-2 capitalize text-lg ${
          isAdmin && "text-xl"
        } font-medium text-gray-900 dark:text-white`}
      >
        {t(labelText)}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
        placeholder={t(placeholder)}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
