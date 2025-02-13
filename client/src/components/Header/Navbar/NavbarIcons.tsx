"use client";

import React, { useState, useEffect } from "react";
import {
  englishIcon,
  menuIcon,
  moonIcon,
  searchIcon,
  sunIcon,
  user,
} from "@/components/Icons";
import IconButton from "./IconButton";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "../Search/SearchContext";

interface NavbarIconsProps extends LocaleProps {
  isMenuVisible: boolean;
  toggleMenu: () => void;
}

const NavbarIcons: React.FC<NavbarIconsProps> = ({
  isMenuVisible,
  toggleMenu,
  locale,
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const resetURL = pathName.split(`/${locale}`)[1];
  const nextLang = locale === "en" ? "ar" : "en";
  const [getAdminFromLocalStorage, setAdminFromLocal] = useState(null);
  const { toggleSearchPopup } = useSearch();

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleLanguage = () => {
    const searchParams = window.location.search;
    router.push(`/${nextLang}${resetURL}${searchParams}`);
    localStorage.setItem("locale", nextLang);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setAdminFromLocal(parsedData?.isAdmin || null);
    }
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="flex px-2 space-x-2 shadow-none sm:mx-3 lg:mx-0 sm:px-0 lg:order-2 rtl:space-x-reverse dark:shadow-none">
      <IconButton
        ariaLabel="search"
        className="hidden lg:flex"
        onClick={toggleSearchPopup}
      >
        {searchIcon}
      </IconButton>
      <IconButton
        ariaLabel={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
        onClick={toggleMode}
      >
        {darkMode ? moonIcon : sunIcon}
      </IconButton>
      <IconButton
        ariaLabel={locale === "ar" ? "Switch to English" : "Switch to Arabic"}
        onClick={toggleLanguage}
      >
        {locale === "ar" ? englishIcon : "AR"}
      </IconButton>
      <IconButton
        onClick={toggleMenu}
        ariaLabel="toggle menu visibility"
        aria-expanded={isMenuVisible}
        className="inline-flex items-center justify-center lg:hidden"
      >
        {menuIcon}
      </IconButton>
      {getAdminFromLocalStorage && (
        <button
          type="button"
          className="hidden lg:flex"
          onClick={() => router.push(`/${locale}/dashboard/statistics`)}
        >
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            {user}
          </div>
        </button>
      )}
    </div>
  );
};

export default NavbarIcons;
