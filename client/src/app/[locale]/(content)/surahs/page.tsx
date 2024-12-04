import React from "react";
import shareMetadata from "../_shareMetadata";
import { getTranslations } from "next-intl/server";
import PageHeading from "@/components/ui/PageHeading";
import SurahsList from "@/components/Surah/SurahsList";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params: { locale } }: PageParams) {
  const t = await getTranslations();
  const pageUrl = `surah`;
  const title = t("quranicSurahs");

  return shareMetadata({ title, locale, pageUrl });
}

const SurahListPage: React.FC<PageParams> = ({ params: { locale } }) => {
  const t = useTranslations();

  return (
    <div className="container p-3 mx-auto my-3 bg-white border shadow-xl dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
      <div className="flex flex-col gap-5">
        <PageHeading text={t("quranicSurahs")} />
        <SurahsList locale={locale} />
      </div>
    </div>
  );
};

export default SurahListPage;
