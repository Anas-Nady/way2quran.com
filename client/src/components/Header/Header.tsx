import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Navbar from "./Navbar/Navbar";
const Header: React.FC<LocaleProps> = ({ locale }) => {
  const t = useTranslations("NavbarLinks");

  return (
    <header className="bg-white h-[105px] dark:bg-gray-900 sticky top-0 z-50 items-center border-b border-gray-200 dark:border-gray-600 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between py-3 mx-auto lg:container">
        <Link
          href={`/${locale}`}
          className="rtl:mr-1 ltr:ms-1 lg:rtl:mr-0 lg:ltr:ms-0"
        >
          <Image
            className="object-cover w-[90px]"
            src={logo}
            width={90}
            height={90}
            alt={t("titleHome")}
            priority
          />
        </Link>
        <Navbar locale={locale} />
      </div>
    </header>
  );
};

export default Header;
