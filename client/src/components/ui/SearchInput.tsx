"use client";

import React, { useEffect, useState } from "react";
import { searchIcon } from "@/components/Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import getFontClass from "@/helpers/getFontClass";

const SearchInput: React.FC = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();

    if (value.trim() === "" && searchParams.get("search") === "") {
      return;
    }

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("currentPage", "1");
    params.set("search", value.trim());
    router.push(`${pathName}?${params.toString()}`);
  };

  const searchValue: string = decodeURIComponent(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  return (
    <form onSubmit={handleSearch} className="relative w-[250px] lg:w-[300px]">
      <button
        aria-label="Search"
        type="submit"
        onClick={handleSearch}
        className={`${
          value.length > 0 ? "cursor-pointer" : "cursor-default"
        } absolute inset-y-0 flex items-center px-3 duration-300 bg-gray-200 rounded end-0 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-600`}
      >
        {searchIcon}
      </button>
      <input
        type="search"
        id="default-search"
        className={`block w-full py-2 lg:py-3.5 px-4 text-gray-900 border border-gray-300 rounded-lg text-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white ${getFontClass(
          value
        )}`}
        placeholder={t("search")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
