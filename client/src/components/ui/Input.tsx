import React, { ChangeEvent } from "react";

interface InputProps {
  type?: "email" | "password" | "text" | "number" | "file";
  placeholder?: string;
  labelText: string;
  id: string;
  name?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  disabled?: boolean;
  multiple?: boolean;
  readonly?: boolean;
  accept?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  labelText,
  name,
  id,
  className = "",
  onChange,
  value,
  disabled = false,
  multiple = false,
  readonly = false,
  accept = "*",
  required = true,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className={`block mb-2 capitalize text-lg sm:text-xl font-medium text-center text-gray-900 dark:text-white`}
      >
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={`${className} ${
          type === "file" && "pt-3"
        } max-w-full h-14 bg-gray-50 border border-gray-300 text-gray-900 text-lg sm:text-xl rounded-lg focus:border-orange-500 block w-full py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-orange-500`}
        multiple={multiple}
        {...(type !== "file" ? { value } : {})}
        onChange={onChange}
        disabled={disabled}
        readOnly={readonly}
        accept={type === "file" ? accept : undefined}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
