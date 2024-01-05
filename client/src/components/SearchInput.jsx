import React from "react";
import { searchIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    navigateTo(`${location.pathname}?keyword=${e.target.value}&pageNumber=1`);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        {searchIcon}
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-[270px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
        placeholder={t("searchPlaceholder")}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
