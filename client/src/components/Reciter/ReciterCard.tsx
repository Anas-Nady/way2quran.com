import React from "react";
import Link from "next/link";
import ReciterImg from "./ReciterImg";

import getName from "@/helpers/getNameForCurrentLang";
import { useTranslations } from "next-intl";

interface ReciterCardProps extends LocaleProps {
  reciter: ReciterProfile;
  recitationSlug: string;
}

const ReciterCard: React.FC<ReciterCardProps> = ({
  reciter,
  recitationSlug,
  locale,
}) => {
  const reciterName = getName(reciter, locale);
  const t = useTranslations("ReciterCard");

  return (
    <Link
      href={`/${locale}/reciters/${reciter.slug}?recitationSlug=${recitationSlug}`}
      title={reciterName}
    >
      <div className="transition-transform duration-300 transform card hover:-translate-y-1">
        <div className="w-full px-2 min-w-[250px] min-h-[236px] max-w-[300px] bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-1 pt-4"></div>
          <div className="flex flex-col items-center pb-5">
            <span className="mb-2 ">
              <ReciterImg
                src={reciter.photo}
                alt={t("reciterImageAlt", { name: reciterName })}
              />
            </span>
            <h2 className="my-1 text-center text-2xl line-clamp-1 max-w-[250px] capitalize font-semibold text-gray-900 dark:text-white">
              {reciterName}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReciterCard;
