import React from "react";
import getName from "@/helpers/getNameForCurrentLang";

interface SelectOptionsProps extends LocaleProps {
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  required?: boolean;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({
  options,
  onChange,
  value,
  defaultValue = "",
  placeholder = "",
  disabled = false,
  className = "",
  name = "",
  id = "",
  required = false,
  locale,
}) => {
  return (
    <div className="flex gap-2 w-[200px] md:w-[300px]">
      <select
        name={name}
        id={id}
        value={value || defaultValue || ""}
        onChange={onChange}
        disabled={disabled}
        className={`${className} bg-gray-50 border mb-2.5 h-fit p-3 text-xl w-full border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.slug}
            value={option.slug}
            disabled={option.disabled}
          >
            {getName(option, locale)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptions;
