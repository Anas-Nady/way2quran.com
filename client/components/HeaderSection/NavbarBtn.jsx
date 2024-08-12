"use client";
import React, { useEffect, useState } from "react";
import { englishIcon, menuIcon, moonIcon, sunIcon, user } from "../Icons";
import { usePathname, useRouter } from "next/navigation";
import NavbarLinks from "./NavbarLinks";

export default function NavbarBtn({ links }) {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];
  const resetURL = pathName.split(`/${currentLang}`)[1];
  const nextLang = currentLang == "en" ? "ar" : "en";
  const [getAdminFromLocalStorage, setAdminFromLocal] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleLanguage = () => {
    const searchParams = window.location.search;
    router.push(`/${nextLang}${resetURL}${searchParams}`);
    localStorage.setItem("currentLang", nextLang);
  };

  useEffect(() => {
    setMounted(true);
    setAdminFromLocal(JSON.parse(localStorage.getItem("user"))?.isAdmin);
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    mounted && (
      <>
        <div className="flex px-2 space-x-2 shadow-none sm:mx-3 lg:mx-0 sm:px-0 lg:order-2 rtl:space-x-reverse dark:shadow-none">
          <button
            type="button"
            aria-label={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
            onClick={toggleMode}
            className="px-4 py-2 text-sm font-medium text-center text-black rounded-lg bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:outline-none dark:focus:outline-none lg:px-4 dark:text-white dark:bg-slate-600 dark:hover:bg-slate-700"
          >
            {darkMode ? moonIcon : sunIcon}
          </button>
          <button
            onClick={toggleLanguage}
            aria-label={
              currentLang === "ar" ? "Switch to English" : "Switch to Arabic"
            }
            className="px-4 py-2 text-sm font-medium text-center text-black rounded-lg bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:outline-none dark:focus:outline-none lg:px-4 dark:text-white dark:bg-slate-600 dark:hover:bg-slate-700"
          >
            {currentLang == "ar" ? englishIcon : "AR"}
          </button>
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center w-10 h-10 text-sm text-gray-500 rounded-lg lg:hidden bg-slate-100 dark:bg-gray-700 hover:bg-gray-200 focus:outline-none ring-2 ring-gray-200 dark:text-gray-400 dark:hover:text-slate-100 dark:hover:bg-gray-700 dark:ring-gray-600"
            aria-expanded={isMenuOpen}
          >
            {menuIcon}
          </button>
          {getAdminFromLocalStorage && (
            <button
              type="button"
              className="hidden lg:flex"
              onClick={() =>
                router.push(`/${currentLang}/dashboard/add-reciter`)
              }
            >
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {user}
              </div>
            </button>
          )}
        </div>
        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
            currentLang == "ar" && "lg:mr-[30px] xl:mr-[130px]"
          } ${isMenuOpen ? "block" : "hidden"}`}
        >
          <NavbarLinks
            currentLang={currentLang}
            links={links}
            toggleMenu={toggleMenu}
          />
        </div>
      </>
    )
  );
}
