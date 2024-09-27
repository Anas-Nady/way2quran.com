"use client";

import React from "react";

interface CheckboxProps {
  labelText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  labelText,
  checked,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex items-center my-4">
      <input
        id={`checkbox-${labelText}`}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={`w-6 h-6 bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`}
      />
      <label
        htmlFor={`checkbox-${labelText}`}
        className="text-xl font-semibold text-gray-900 ms-2 dark:text-gray-300"
      >
        {labelText}
      </label>
    </div>
  );
};

export default Checkbox;
