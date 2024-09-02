import { getTranslations } from "next-intl/server";
import listQuranPdf from "@/constants/listQuranPdf";
import HeadingPage from "@/components/HeadingPage";
import shareMetadata from "../_shareMetadata";
import getName from "@/utils/getNameForCurrentLang";
import QuranList from "./_QuranList";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({
    locale,
  });
  const pageUrl = `download-quran-pdf`;
  const title = t("downloadQuranPdf");

  return shareMetadata({ title, locale, pageUrl });
}

export default async function VariousRecitationsPage({ params: { locale } }) {
  const t = await getTranslations({
    locale,
  });

  return (
    <section className="relative p-4 mx-auto bg-white border max-w-screen-2xl border-1 border-slate-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="relative flex flex-col flex-wrap items-center justify-center lg:flex-row lg:justify-start lg:gap-5">
        <span className="flex-1 min-w-[250px]">
          <HeadingPage name={t("downloadQuranPdf")} />
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 my-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listQuranPdf.map((quran) => {
          const quranName = getName(quran, locale);

          return (
            <QuranList quran={quran} quranName={quranName} key={quran.slug} />
          );
        })}
      </div>
    </section>
  );
}
