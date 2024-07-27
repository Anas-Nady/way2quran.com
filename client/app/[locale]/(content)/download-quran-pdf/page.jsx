import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import listQuranPdf from "@/constants/listQuranPdf";
import HeadingPage from "@/components/HeadingPage";
import shareMetadata from "../_shareMetadata";
import getName from "@/utils/getNameForCurrentLang";

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
            <Link
              href={quran.downloadLink}
              target="_blank"
              title={quranName}
              key={quran.id}
              className="flex p-2 flex-col mt-2 duration-300 border cursor-pointer hover:scale-[1.01] hover:-translate-y-1 quran-pdf dark:border-gray-700"
            >
              <div className="flex justify-center flex-1 overflow-hidden duration-200">
                <Image
                  src={quran.img}
                  className="object-cover w-[367px] h-[538px]"
                  alt={quranName}
                  width={600}
                  height={600}
                  loading="lazy"
                />
              </div>
              <h3 className="py-2 text-lg font-semibold text-center text-gray-700 bg-gray-300 line-clamp-1 dark:bg-gray-600 md:text-xl xl:text-2xl dark:text-white">
                {quranName}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
