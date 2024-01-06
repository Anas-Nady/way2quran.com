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
      className="bg-gray-50 border my-2.5 h-fit p-2 max-w-[300px] text-md sm:text-xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
      onChange={(e) => setSelectedRecitationType(e.target.value)}
      value={selectedRecitationType}
    >
      <option disabled value="">
        {t("chooseRecitation")}
      </option>
      {recitations.map((recitation, i) => (
        <option
          value={recitation.slug}
          selected={recitation.slug === selectedRecitationType}
          key={i}
          className="text-md sm:text-xl"
        >
          {currentLang == "en" ? recitation.name : recitation.name_ar}
        </option>
      ))}
    </select>
  );
};

export default SelectRecitation;
