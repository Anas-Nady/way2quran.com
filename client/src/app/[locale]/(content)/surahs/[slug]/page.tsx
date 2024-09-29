import getName from "@/helpers/getNameForCurrentLang";
import shareMetadata from "../../_shareMetadata";
import { getSurahInfo } from "@/actions/surah";
import SurahVerses from "@/components/Surah/SurahVerses";
import PageHeading from "@/components/ui/PageHeading";
import { PageParams } from "@/types/types";
import SURAHS_LIST from "@/constants/SurahsList";
import { unstable_setRequestLocale } from "next-intl/server";

type SurahPageProps = PageParams & {
  params: { slug: string };
};

export async function generateMetadata({
  params: { locale, slug },
}: SurahPageProps) {
  const pageUrl = `surah/${slug}`;

  const surahFetch = await getSurahInfo({
    slug,
  });
  if (!surahFetch) return null;

  const { surah } = surahFetch;
  const surahName = getName(surah, locale);

  const title = `${surahName}`;
  return shareMetadata({ title, locale, pageUrl });
}

export async function generateStaticParams() {
  return SURAHS_LIST.map((surah) => ({
    slug: surah.slug,
  }));
}

const SurahPage: React.FC<SurahPageProps> = async ({
  params: { locale, slug },
}) => {
  unstable_setRequestLocale(locale);
  const surahFetch = await getSurahInfo({
    slug,
    select: "verses",
  });

  if (!surahFetch) return null;
  const { surah, previousSurah, nextSurah } = surahFetch;

  return (
    <div className="container p-3 mx-auto my-3 bg-white border shadow-xl dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
      <PageHeading text={getName(surah, locale)} />
      <SurahVerses
        locale={locale}
        surah={surah}
        verses={surah?.verses || []}
        nextSurah={nextSurah}
        prevSurah={previousSurah}
      />
    </div>
  );
};

export default SurahPage;
