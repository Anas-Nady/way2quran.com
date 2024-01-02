import React, { useEffect, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

function NavbarLinks({ toggleMenu }) {
  const { t } = useTranslation();

  const links = [
    {
      name: t("link_1"),
      path: "/completed-recitations",
    },
    {
      name: t("link_2"),
      path: "/frequent-recitations",
    },
    {
      name: t("link_3"),
      path: "/various-recitations",
    },
  ];

  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 text-lg font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {links.map((link, i) => (
        <button key={i} onClick={toggleMenu} className="text-start">
          <Link
            to={link.path}
            className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
               md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 `}
          >
            {link.name}
          </Link>
        </button>
      ))}
    </ul>
  );
}

export default NavbarLinks;
