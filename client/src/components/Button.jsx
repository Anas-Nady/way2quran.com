import React from "react";
import { useTranslation } from "react-i18next";

const Button = ({
  type = "button",
  className,
  text,
  handleSubmit,
  disabled = false,
  icon = null,
}) => {
  const { t } = useTranslation();
  return (
    <button
      type={type}
      className={`w-fit px-3 text-lg py-2 text-gray-900 dark:text-slate-50 bg-slate-200  border border-slate-400 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 duration-200 rounded-lg ${
        disabled && "cursor-not-allowed opacity-50"
      } ${className}`}
      onClick={handleSubmit}
      disabled={disabled}
    >
      {t(text)}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
