import SearchInput from "./_SearchInput";
import shareMetadata from "../_shareMetadata";
import { getTranslations } from "next-intl/server";
import HeadingPage from "@/components/HeadingPage";
import SurahsGrid from "./SurahsGrid";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations();
  const pageUrl = `surah`;
  const title = t("quranicSurahs");

  return shareMetadata({ title, locale, pageUrl });
}

export default async function SurahListPage({ params: { locale } }) {
  const t = await getTranslations({ locale });

  return (
    <div className="container p-3 mx-auto my-3 bg-white border shadow-xl dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
      <div className="flex flex-col gap-5">
        <HeadingPage name={t("quranicSurahs")} />
        <SearchInput locale={locale} placeholder={t("whatYouWantToRead")} />
        <SurahsGrid locale={locale} />
      </div>
    </div>
  );
}
