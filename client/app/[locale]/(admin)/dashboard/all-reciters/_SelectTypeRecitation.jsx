"use client";
import getName from "@/utils/getNameForCurrentLang";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SelectTypeRecitation({
  onChange = () => {},
  options,
  placeholder,
  optionDisabled = true,
  currentLang = "ar",
  required = true,
}) {
  const searchParams = useSearchParams();
  const [recitationSlug, setRecitationSlug] = useState(
    searchParams.get("recitationSlug") || options[0]?.slug || ""
  );
  const router = useRouter();
  const pathName = usePathname();

  const handleSelectChange = (e) => {
    const selectedOptionValue = e.target.value;
    setRecitationSlug(e.target.value);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("recitationSlug", selectedOptionValue);
    params.set("currentPage", 1);

    router.push(`${pathName}?${params.toString()}`);
    // Call the provided onChange function
    onChange(e);
  };

  const valueFromUrl = searchParams.get("recitationSlug") || "";

  useEffect(() => {
    setRecitationSlug(valueFromUrl);
  }, [valueFromUrl]),
    useEffect(() => {
      handleSelectChange({ target: { value: recitationSlug } }); // Pass a synthetic event to mimic the initial selection
    }, []);

  return (
    <div className="flex gap-2 w-[200px] md:w-[300px]">
      <select
        value={recitationSlug}
        onChange={handleSelectChange}
        required={required}
        className="bg-gray-50 border mb-2.5 h-fit p-3 text-xl w-full border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
              {getName(option, currentLang)}
              {option?.label || ""}
            </option>
          ))}
      </select>
    </div>
  );
}
