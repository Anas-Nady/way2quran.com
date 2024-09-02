"use client";
import { useState, useEffect } from "react";
import { closeIcon, searchIcon } from "../Icons";
import { useSearch } from "./SearchContext";
import { useTranslations } from "next-intl";
import SearchResult from "./SearchResult";

export default function SearchPopup({ currentLang }) {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState({
    reciters: [],
    recitations: [],
    surahs: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isSearchPopupOpen, toggleSearchPopup } = useSearch();
  const t = useTranslations();

  useEffect(() => {
    if (isSearchPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearchPopupOpen]);

  useEffect(() => {
    if (searchValue.trim().length === 0) {
      setResults({
        reciters: [],
        recitations: [],
        surahs: [],
      });
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchValue)}`
        );
        const data = await response.json();

        if (response.ok) {
          setResults({
            reciters: data.reciters || [],
            recitations: data.recitations || [],
            surahs: data.surahs || [],
          });
        } else {
          setError(data.message || "An error occurred");
        }
      } catch (err) {
        setError("An error occurred while fetching data", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchValue]);

  // check if there are any non-empty array in results
  const hasResults = Object.values(results).some((array) => array.length > 0);

  return (
    <div
      className={`popup ${
        isSearchPopupOpen ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-gray-500 dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 z-50 justify-center items-center`}
    >
      <div className="relative p-4 mx-2 sm:mx-0 md:py-6 md:px-12 text-center z-50 border-2 dark:border-gray-500 border-gray-100 bg-slate-200 dark:bg-gray-900 text-slate-50 w-[500px] h-[40vh]">
        <span
          onClick={toggleSearchPopup}
          className="absolute z-40 flex items-center justify-center w-8 h-8 text-black border border-black rounded-full cursor-pointer ltr:-left-2 rtl:-right-2 -top-3 bg-slate-200 hover:bg-slate-300 dark:hover:bg-gray-700 dark:bg-gray-900 dark:text-white dark:border-white"
        >
          {closeIcon}
        </span>
        <div className="flex flex-col items-center w-full h-full gap-4">
          <div className="relative w-full">
            <div
              className={`${
                searchValue.length > 0 ? "cursor-pointer" : "cursor-default"
              } absolute inset-y-0 flex items-center px-3 duration-300 bg-gray-200 rounded end-0 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-600`}
            >
              {searchIcon}
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full h-14 py-2 lg:py-3.5 px-4 text-gray-900 border border-gray-300 rounded-lg text-md sm:text-lg bg-gray-50  dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white"
              placeholder={t("search")}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {loading && (
            <p className="text-gray-600 dark:text-gray-400">Loading</p>
          )}
          {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
          {hasResults && !loading && !error && (
            <SearchResult
              currentLang={currentLang}
              toggleSearchPopup={toggleSearchPopup}
              results={results}
            />
          )}
          {!hasResults && !loading && !error && (
            <p className="text-gray-600 dark:text-gray-400 text-md sm:text-lg">
              {t("noResultsFound")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
