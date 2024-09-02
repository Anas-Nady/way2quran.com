"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconButton from "./IconButton";
import { searchIcon } from "../Icons";
import { useSearch } from "../Search/SearchContext";

function NavbarLinks({ currentLang, links, isMenuVisible, toggleMenu }) {
  const pathName = usePathname();
  const { toggleSearchPopup } = useSearch();

  return (
    <div
      className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
        currentLang == "ar" && "xl:mr-[50px] 2xl:mr-[80px]"
      } ${isMenuVisible ? "block" : "hidden"}`}
    >
      <ul className="flex flex-col p-4 mt-3 text-lg font-bold border border-gray-100 rounded-lg lg:p-0 sm:text-xl ltr:lg:text-lg rtl:lg:text-xl ltr:xl:text-2xl rtl:xl:text-2xl bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
        <>
          {links.map((link, i) => (
            <li key={i} onClick={toggleMenu} className="text-start">
              <Link
                href={`/${currentLang}/${link.path}`}
                className={`block py-2 px-3 rounded hover:text-green-600 duration-300 lg:duration-0 dark:hover:text-green-400 text-green-500 dark:text-green-500 lg:p-0 ${
                  pathName.includes(link.path) &&
                  "text-green-600 dark:text-green-400"
                }  `}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li onClick={toggleMenu}>
            <IconButton
              className="block w-full lg:hidden"
              onClick={toggleSearchPopup}
            >
              {searchIcon}
            </IconButton>
          </li>
        </>
      </ul>
    </div>
  );
}

export default NavbarLinks;
