import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { useTranslations } from "next-intl";
import logo from "@/public/logo.png";

export default function Header() {
  const t = useTranslations("NavbarLinks");

  const links = [
    {
      name: t("link_1"),
      path: "full-holy-quran",
    },
    {
      name: t("link_2"),
      path: "frequent-recitations",
    },
    {
      name: t("link_3"),
      path: "various-recitations",
    },
    {
      name: t("downloadQuranPdf"),
      path: "download-quran-pdf",
    },
  ];

  return (
    <nav className="bg-white h-[105px] dark:bg-gray-900 sticky top-0 z-50 items-center border-b border-gray-200 dark:border-gray-600 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between py-3 mx-auto lg:container">
        <Link href="/" className="rtl:mr-1 ltr:ms-1 lg:rtl:mr-0 lg:ltr:ms-0">
          <Image
            className="object-cover w-[90px]"
            src={logo}
            width={90}
            height={90}
            alt={t("titleHome")}
            priority
          />
        </Link>
        <Navbar links={links} />
      </div>
    </nav>
  );
}
