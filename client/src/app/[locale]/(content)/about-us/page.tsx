import React from "react";
import shareMetadata from "@/app/[locale]/(content)/_shareMetadata";
import PageHeading from "@/components/ui/PageHeading";
import { noteIcon } from "@/components/Icons";
import { socialMediaLinks } from "@/constants/SocialMediaLinks";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: PageParams) {
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const title = t("aboutTitle");
  const pageUrl = `/${locale}/about-us`;

  return shareMetadata({ title, locale, pageUrl });
}

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="my-10">
      <div className="text-center about-us">
        <PageHeading text={t("aboutTitle")} color="orange" />
        <div className="max-w-screen-lg mx-auto">
          <ul className="flex flex-col flex-wrap items-start justify-start gap-4 px-3 my-10 list-none text-star">
            {Array.from({ length: 5 }, (_, index) => (
              <li
                key={index + 1}
                className="flex justify-center gap-2 items-start font-medium text-green-500 text-xl sm:text-2xl 2xl:text-3xl dark:text-green-500 text-start"
              >
                <span className="font-bold text-gray-800 xl:mt-1 2xl:mt-2 dark:text-white">
                  {noteIcon}
                </span>
                <span className="leading-normal">
                  {t(`about_${index + 1}`)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-3 mt-8 social-media-links">
            {socialMediaLinks.map((link, i) => (
              <a key={i} href={link.href} target="_blank">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
