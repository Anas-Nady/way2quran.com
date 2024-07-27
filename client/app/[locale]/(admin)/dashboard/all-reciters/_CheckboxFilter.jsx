"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckboxFilter({ labelText, filterOption }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [checkboxValue, setCheckboxValue] = useState(
    searchParams.get(filterOption) || false
  );

  const handleCheckboxChange = () => {
    const updatedValue = !checkboxValue;
    setCheckboxValue(updatedValue);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set(filterOption, updatedValue ? "true" : "");
    params.set("currentPage", 1);

    router.push(`${pathName}?${params.toString()}`);
  };

  const filterValueFromURL = searchParams.get(filterOption) == "true";

  useEffect(() => {
    setCheckboxValue(filterValueFromURL);
  }, [filterValueFromURL]);

  return (
    <div className="flex items-center">
      <input
        id="top-viewers-checkbox"
        type="checkbox"
        checked={checkboxValue}
        onChange={() => {}}
        className="w-4 h-4 text-xl bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        onClick={handleCheckboxChange}
        htmlFor="top-viewers-checkbox"
        className="text-xl font-medium text-gray-900 ms-2 dark:text-gray-300"
      >
        {labelText}
      </label>
    </div>
  );
}
