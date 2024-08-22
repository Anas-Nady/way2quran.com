"use client";

import { searchIcon } from "@/components/Icons";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInput({ placeholder }) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("search", value);
    else params.delete("search");

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    updateSearchParams(searchValue);
  }, [searchValue]);

  return (
    <div className="relative w-[250px] sm:w-[300px] min-h-[65px] mx-auto">
      <div className="relative w-full">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          {searchIcon}
        </div>
        <input
          type="search"
          id="surah-search"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg text-md ps-10 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default SearchInput;
