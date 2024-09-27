"use client";

import { WELCOME_LOGO } from "@/constants/Images";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WelcomeSection() {
  const t = useTranslations("HomePage");

  return (
    <div
      className={`max-w-screen-3xl bg-[url('https://storage.googleapis.com/way2quran_storage/imgs/main-bg.svg')] mx-auto bg-cover bg-center bg-no-repeat -mt-[1rem] -me-2 -ms-2 flex items-center min-h-[750px] bg-slate-200 dark:bg-gray-700`}
    >
      <div className="container flex flex-wrap items-center w-full gap-6 p-6 mx-auto text-center lg:flex-nowrap lg:gap-2 lg:p-0">
        <p className="text-[30px] sm:text-4xl md:text-5xl 2xl:text-[55px] mx-auto text-gray-700 font-semibold dark:text-white leading-[40px] max-w-[950px]">
          {t("part_1")} <span className="text-green-500">{t("part_2")}</span>
          {t("part_3")}
        </p>
        <div className="mx-auto sm:me-auto">
          <Image
            src={WELCOME_LOGO}
            alt={t("titleHome")}
            className="w-[400px]  md:w-[500px] xl:w-[600px] mx-auto 2xl:mx-0"
            sizes="(max-width: 400px) 90vw, (max-width: 600px) 80vw, 600px"
            width="600"
            height="300"
            priority
          />
        </div>
      </div>
    </div>
  );
}
