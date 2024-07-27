"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavbarLinks({ currentLang, links, toggleMenu }) {
  const pathName = usePathname();
  return (
    <ul className="flex flex-col p-4 mt-3 font-bold border border-gray-100 rounded-lg lg:p-0 text-md sm:text-lg ltr:lg:text-lg rtl:lg:text-xl ltr:xl:text-2xl rtl:xl:text-2xl bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
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
    </ul>
  );
}

export default NavbarLinks;
