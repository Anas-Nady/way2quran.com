import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SiteTitle from "../ui/SiteTitle";
import { kufiArabicFont } from "@/assets/fonts";
import { paypalIcon } from "../Icons";

const Footer: React.FC<LocaleProps> = ({ locale }) => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const links = [
    { href: `/${locale}/about-us`, title: t("aboutTitle") },
    { href: `/${locale}/contact-us`, title: t("contactTitle") },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-gray-900 h-[185px] border-t-[1px] border-gray-200 dark:border-gray-700 p-6">
      <div className="container w-full py-4">
        <div className="flex flex-col flex-wrap items-center justify-center gap-5 mb-4 md:flex-row md:justify-between sm:mb-0">
          <Link
            href="/"
            className="flex items-center mx-auto space-x-3 rtl:space-x-reverse md:mx-0"
          >
            <SiteTitle locale={locale} />
          </Link>
          <ul className="flex flex-wrap sm:items-center font-medium text-orange-500 gap-4 sm:gap-9 ltr:text-sm rtl:text-[18px] rtl:sm:text-xl rtl:lg:text-2xl ltr:sm:text-xl ltr:lg:text-2xl dark:text-orange-500">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:underline ${
                    locale === "ar" && kufiArabicFont.className
                  } ${locale == "ar" ? "font-kufiArabic" : "font-english"}`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 pt-2 mt-3 border-t-[1px] border-gray-200 md:mt-5 dark:border-gray-700">
          <div className="flex items-center justify-center gap-1 text-center text-gray-500 text-md lg:text-xl dark:text-gray-400">
            <span> {t("allRightsReserved")}</span>
            <span className="font-english">© {currentYear}</span>
          </div>
          <Link
            href="https://www.paypal.com/paypalme/way2quran25"
            target="_blank"
            className="flex gap-1 items-center text-gray-800 dark:text-gray-200 hover:cursor-pointer"
          >
            <span className="text-lg xl:text-xl font-semibold hover:text-blue-400">
              {t("supportus")}
            </span>
            <span>{paypalIcon}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
