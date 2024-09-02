"use client";

import { useState, useEffect } from "react";
import {
  englishIcon,
  menuIcon,
  moonIcon,
  searchIcon,
  sunIcon,
  user,
} from "../Icons";
import IconButton from "./IconButton";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "../Search/SearchContext";

export default function NavbarIcons({ isMenuVisible, toggleMenu }) {
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];
  const resetURL = pathName.split(`/${currentLang}`)[1];
  const nextLang = currentLang == "en" ? "ar" : "en";
  const [getAdminFromLocalStorage, setAdminFromLocal] = useState(null);
  const { toggleSearchPopup } = useSearch();

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleLanguage = () => {
    const searchParams = window.location.search;
    router.push(`/${nextLang}${resetURL}${searchParams}`);
    localStorage.setItem("currentLang", nextLang);
  };

  useEffect(() => {
    setAdminFromLocal(JSON.parse(localStorage.getItem("user"))?.isAdmin);
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="flex px-2 space-x-2 shadow-none sm:mx-3 lg:mx-0 sm:px-0 lg:order-2 rtl:space-x-reverse dark:shadow-none">
      <IconButton className="hidden lg:flex" onClick={toggleSearchPopup}>
        {searchIcon}
      </IconButton>
      <IconButton
        ariaLabel={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
        onClick={toggleMode}
      >
        {darkMode ? moonIcon : sunIcon}
      </IconButton>
      <IconButton
        ariaLabel={
          currentLang === "ar" ? "Switch to English" : "Switch to Arabic"
        }
        onClick={toggleLanguage}
      >
        {currentLang === "ar" ? englishIcon : "AR"}
      </IconButton>
      <IconButton
        onClick={toggleMenu}
        aria-expanded={isMenuVisible}
        className="inline-flex items-center justify-center lg:hidden"
      >
        {menuIcon}
      </IconButton>
      {getAdminFromLocalStorage && (
        <button
          type="button"
          className="hidden lg:flex"
          onClick={() => router.push(`/${currentLang}/dashboard/statistics`)}
        >
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            {user}
          </div>
        </button>
      )}
    </div>
  );
}
