import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TitleSite from "./TitleSite";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-50 shadow dark:bg-gray-900 border-t-[1px] -mb-6 border-gray-200 dark:border-gray-700 mt-8 pt-4">
      <div className="w-full container p-4">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              <TitleSite />
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-md sm:text-xl lg:text-2xl font-medium text-orange-500 sm:mb-0 dark:text-orange-500">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">
                {t("aboutTitle")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline me-4 md:me-6">
                {t("contactTitle")}
              </Link>
            </li>
          </ul>
        </div>
        <span className="block text-md lg:text-xl text-gray-500 text-center dark:text-gray-400">
          © {new Date(Date.now()).getFullYear()}
          <span> {t("allRightsReserved")}</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
