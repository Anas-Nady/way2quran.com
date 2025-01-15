"use client";
import React from "react";
import Link from "next/link";
import IconButton from "./IconButton";
import { searchIcon } from "@/components/Icons";
import { useSearch } from "../Search/SearchContext";
import { useTranslations } from "next-intl";

type NavbarLinksProps = LocaleProps & {
  isMenuVisible: boolean;
  toggleMenu: () => void;
};

const NavbarLinks: React.FC<NavbarLinksProps> = ({
  locale,
  isMenuVisible,
  toggleMenu,
}) => {
  const { toggleSearchPopup } = useSearch();
  const t = useTranslations("NavbarLinks");

  const links = [
    {
      name: t("holyQuran"),
      route: `/${locale}/reciters?recitationSlug=full-holy-quran`,
    },
    {
      name: t("frequentRecitations"),
      route: `/${locale}/frequent-recitations`,
    },
    {
      name: t("variousRecitations"),
      route: `/${locale}/reciters?recitationSlug=various-recitations`,
    },
    {
      name: t("downloadMushaf"),
      route: `/${locale}/download-mushaf`,
    },
  ];

  return (
    <div
      className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
        isMenuVisible ? "block" : "hidden"
      }`}
    >
      <ul className="flex flex-col p-4 text-lg font-bold border border-gray-100 rounded-b-lg lg:p-0 sm:text-xl ltr:lg:text-lg rtl:lg:text-xl ltr:xl:text-2xl rtl:xl:text-2xl bg-gray-50 lg:space-x-6 2xl:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
        {links.map((link) => (
          <li key={link.route} onClick={toggleMenu} className="text-start">
            <Link
              href={link.route}
              className="block py-2 px-3 rounded hover:text-green-600 duration-300 lg:duration-0 dark:hover:text-green-400 text-green-500 dark:text-green-500 lg:p-0"
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li onClick={toggleMenu}>
          <IconButton
            className="block w-full lg:hidden"
            onClick={toggleSearchPopup}
            ariaLabel="search"
          >
            {searchIcon}
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default NavbarLinks;
