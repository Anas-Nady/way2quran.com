import React, { useEffect, useState } from "react";
import { moon, sun, menu, english, arabic, user } from "./Icons";
import { Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import i18n from "../langs/i18n";
import { useTranslation } from "react-i18next";
import TitleSite from "./TitleSite";

const Navbar = () => {
  const { t } = useTranslation();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : true;
  });

  const [languageSite, setLanguageSite] = useState(() => {
    const storedLanguageSite = localStorage.getItem("language-site");
    return storedLanguageSite ? JSON.parse(storedLanguageSite) : "ar";
  });

  const getAdminFromLocalStorage =
    JSON.parse(localStorage.getItem("user"))?.isAdmin || false;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleLanguage = () => {
    const newLanguage = languageSite === "ar" ? "en" : "ar";
    setLanguageSite(newLanguage);
    if (newLanguage == "ar")
      document.documentElement.setAttribute("dir", "rtl");
    else document.documentElement.removeAttribute("dir");

    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language-site", JSON.stringify(newLanguage));
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Code to handle language change and update the UI
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50  items-center  top-0 start-0 border-b border-gray-200 dark:border-gray-600 transition-all duration-300">
      <div className="flex flex-wrap container items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <img src={logo} className="h-20" alt="Flowbite Logo" /> */}
          <TitleSite />
        </Link>
        <div className="flex md:order-2 space-x-3 gap-1 md:space-x-0 rtl:space-x-reverse  shadow-none dark:shadow-none ">
          <button
            type="button"
            aria-label={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
            onClick={toggleMode}
            className="text-black bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:outline-none dark:focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:bg-slate-600 dark:hover:bg-slate-700"
          >
            {darkMode ? moon : sun}
          </button>
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={
              languageSite == "ar"
                ? "the language of site is Arabic "
                : "the language of site is English"
            }
            className="text-black  bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:outline-none dark:focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:bg-slate-600 dark:hover:bg-slate-700"
          >
            {languageSite == "ar" ? english : arabic}
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {menu}
          </button>
          {getAdminFromLocalStorage && (
            <Link to="/login" className="hidden lg:flex">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {user}
              </div>
            </Link>
          )}
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <NavbarLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
