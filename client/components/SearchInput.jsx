"use client";

import { useEffect, useState } from "react";
import { searchIcon } from "./Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = ({ searchPlaceholder }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("currentPage", 1);
    params.set("search", value.trim());
    router.push(`${pathName}?${params.toString()}`);
  };

  const searchValue = decodeURIComponent(searchParams.get("search") || "");

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  return (
    <div className="relative w-[250px] lg:w-[300px]">
      <div
        onClick={handleSearch}
        className={`${
          value.length > 0 ? "cursor-pointer" : "cursor-default"
        } absolute inset-y-0 flex items-center px-3 duration-300 bg-gray-200 rounded end-0 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-600`}
      >
        {searchIcon}
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full py-2 lg:py-3.5 px-4 text-gray-900 border border-gray-300 rounded-lg text-lg bg-gray-50  dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white "
        placeholder={searchPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
