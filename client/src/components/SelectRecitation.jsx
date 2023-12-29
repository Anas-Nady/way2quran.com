import React from "react";
import { useTranslation } from "react-i18next";

const SelectRecitation = ({
  currentLang,
  recitations,
  selectedRecitationType,
  setSelectedRecitationType,
}) => {
  const { t } = useTranslation();
  console.log(recitations);
  return (
    <select
      className="bg-gray-50 border my-2.5 h-fit p-3 w-[270px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => setSelectedRecitationType(e.target.value)}
    >
      <option disabled value="">
        {t("chooseRecitation")}
      </option>
      {recitations.map((recitation, i) => (
        <option
          value={recitation.slug}
          selected={recitation.slug === selectedRecitationType}
          key={i}
        >
          {currentLang == "en" ? recitation.name : recitation.name_ar}
        </option>
      ))}
    </select>
  );
};

export default SelectRecitation;
