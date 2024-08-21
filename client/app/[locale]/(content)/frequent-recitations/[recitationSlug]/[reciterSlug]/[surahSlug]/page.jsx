import HeaderInfo from "@/components/surahPage/HeaderInfo";
import { getTranslations } from "next-intl/server";
import BodyInfo from "@/components/surahPage/BodyInfo";
import { getSurahInfo, getSurahWithReciter } from "@/actions/surah";
import shareMetadata from "@/app/[locale]/(content)/_shareMetadata";
import getName from "@/utils/getNameForCurrentLang";
import { getReciterInfo } from "@/actions/reciters";
import Error from "@/components/Error";

export async function generateMetadata({
  params: { locale, reciterSlug, recitationSlug, surahSlug },
}) {
  const pageUrl = `frequent-recitations/${recitationSlug}/${reciterSlug}/${surahSlug}`;

  const surahFetch = await getSurahInfo(surahSlug);
  const reciterFetch = await getReciterInfo(reciterSlug);

  if (!surahFetch) return null;
  if (!reciterFetch) return null;

  const { surah } = surahFetch;
  const { reciter } = reciterFetch;

  const surahName = getName(surah, locale);
  const reciterName = getName(reciter, locale);

  const title = `${surahName} - ${reciterName}`;
  const photo = reciter.photo;

  return shareMetadata({ title, locale, pageUrl, photo });
}

export default async function SurahPage({
  params: { locale, reciterSlug, recitationSlug, surahSlug },
  searchParams,
}) {
  const resolvedRecitationSlug = searchParams.recitationSlug || recitationSlug;
  const t = await getTranslations("SurahPage");
  const data = await getSurahWithReciter(
    reciterSlug,
    resolvedRecitationSlug,
    surahSlug
  );

  if (!data) {
    return (
      <Error
        message={`Failed to get /${reciterSlug}/${recitationSlug}/${surahSlug}`}
      />
    );
  }

  const { reciter, recitation, surah, nextSurah, previousSurah } = data;

  const translation = {
    topRecitersTxt: t("topReciters"),
    downloadTxt: t("download"),
    shareTxt: t("share"),
    listeningTxt: t("listening"),
  };

  return (
    <div className="container p-3 mx-auto my-3 bg-white border shadow-xl dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
      <HeaderInfo
        reciter={reciter}
        translation={translation}
        surah={surah}
        surahNumber={surah.surahNumber}
        recitationName={getName(recitation, locale)}
        locale={locale}
      />
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
