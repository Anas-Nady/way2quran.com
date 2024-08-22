import getName from "@/utils/getNameForCurrentLang";
import shareMetadata from "../../_shareMetadata";
import { getSurahInfo } from "@/actions/surah";
import BodyInfo from "@/components/surahPage/BodyInfo";
import HeadingPage from "@/components/HeadingPage";

export async function generateMetadata({ params: { locale, slug } }) {
  const pageUrl = `surah/${slug}`;

  const surahFetch = await getSurahInfo(slug);
  if (!surahFetch) return null;

  const { surah } = surahFetch;
  const surahName = getName(surah, locale);

  const title = `${surahName}`;
  return shareMetadata({ title, locale, pageUrl });
}

export default async function SurahPage({ params: { locale, slug } }) {
  const surahFetch = await getSurahInfo(slug, "verses");

  if (!surahFetch) return null;
  const { surah, previousSurah, nextSurah } = surahFetch;

  return (
    <div className="container p-3 mx-auto my-3 bg-white border shadow-xl dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
      <HeadingPage name={getName(surah, locale)} />
      <BodyInfo
        locale={locale}
        surah={surah}
        surahText={surah?.verses || []}
        nextSurah={nextSurah}
        previousSurah={previousSurah}
      />
    </div>
  );
}
