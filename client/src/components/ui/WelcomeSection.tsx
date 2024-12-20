"use client";

import { WELCOME_LOGO } from "@/constants/Images";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { APP_LINKS } from "@/constants/AppLinks";
import Link from "next/link";

export default function WelcomeSection({ locale }: LocaleProps) {
  const t = useTranslations("HomePage");
  const links = APP_LINKS[locale];

  return (
    <div
      className={`max-w-screen-3xl bg-[url('https://storage.googleapis.com/way2quran_storage/imgs/main-bg.svg')] mx-auto bg-cover bg-center bg-no-repeat -mt-[1rem] -me-2 -ms-2 flex items-center min-h-[750px] bg-slate-200 dark:bg-gray-700`}
    >
      <div className="container flex flex-wrap items-center w-full gap-6 p-6 mx-auto lg:flex-nowrap lg:gap-2 lg:p-0">
        <div className="flex flex-col w-full md:w-fit gap-7">
          <p className="text-[30px] px-1 sm:text-4xl md:text-5xl 2xl:text-[55px] mx-auto text-center text-gray-700 font-semibold dark:text-white leading-[40px] ">
            {t("part_1")} <span className="text-green-500">{t("part_2")}</span>
            {t("part_3")}
          </p>
          <div className="hidden lg:flex gap-4 justify-center items-center">
            {links.map((link, idx) => (
              <Link href={link.downloadURL} key={idx} target="_blank">
                <Image
                  className="hover:scale-95 duration-200"
                  src={link.src}
                  width={180}
                  height={50}
                  alt={link.alt}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto sm:me-auto">
          <Image
            src={WELCOME_LOGO}
            alt={t("titleHome")}
            className="w-[300px] sm:w-[400px] my-5 md:w-[500px] xl:w-[600px] mx-auto 2xl:mx-0"
            sizes="(max-width: 400px) 90vw, (max-width: 600px) 80vw, 600px"
            width={600}
            height={300}
            priority
          />
          <div className="flex lg:hidden gap-5 flex-wrap items-center justify-center">
            {links.map((link, idx) => (
              <Link href={link.downloadURL} key={idx} target="_blank">
                <Image src={link.src} width={100} height={50} alt={link.alt} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
