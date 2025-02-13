import React from "react";
import getName from "@/helpers/getNameForCurrentLang";
import Link from "next/link";

interface RecitationCardProps extends LocaleProps {
  recitation: LocalizedEntity;
}

const RecitationCard: React.FC<RecitationCardProps> = ({
  recitation,
  locale,
}) => {
  const getNameTranslation = getName(recitation, locale);

  return (
    <Link
      href={`/${locale}/reciters?recitationSlug=${recitation.slug}`}
      className="flex justify-center items-center relative p-2  min-w-[340px] max-w-[400px] sm:min-w-[400px] min-h-[80px] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      title={getNameTranslation}
    >
      <div className="overflow-hidden whitespace-nowrap text-ellipsis">
        <h2 className="font-medium text-gray-900 text-md sm:text-lg xl:text-xl dark:font-semibold dark:text-white">
          {getNameTranslation}
        </h2>
      </div>
    </Link>
  );
};

export default RecitationCard;
