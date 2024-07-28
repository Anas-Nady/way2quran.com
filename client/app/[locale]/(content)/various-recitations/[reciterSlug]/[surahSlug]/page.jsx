import HeaderInfo from "@/components/surahPage/HeaderInfo";
import { getSurahInfo, getSurahWithReciter } from "@/actions/surah";
import { getTranslations } from "next-intl/server";
import BodyInfo from "@/components/surahPage/BodyInfo";
import shareMetadata from "./../../../_shareMetadata";
import { HAFS_AN_ASIM, VARIOUS_RECITATIONS } from "@/constants/recitationsName";
import getName from "@/utils/getNameForCurrentLang";
import { getReciterInfo } from "@/actions/reciters";
import Error from "@/components/Error";

export async function generateMetadata({
  params: { locale, reciterSlug, surahSlug },
}) {
  const pageUrl = `${VARIOUS_RECITATIONS}/${reciterSlug}/${surahSlug}`;

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
  params: { locale, reciterSlug, surahSlug },
  searchParams,
}) {
  const recitationSlug = searchParams.recitationSlug || HAFS_AN_ASIM;
  const t = await getTranslations("SurahPage");
  const data = await getSurahWithReciter(
    reciterSlug,
    recitationSlug,
    surahSlug
  );

  if (!data) {
    return (
      <Error
        message={`Failed to get /${reciterSlug}/${recitationSlug}/${surahSlug}`}
      />
    );
  }

  const { reciter, recitation, surah } = data;

  const translation = {
    topRecitersTxt: t("topReciters"),
    downloadTxt: t("download"),
    shareTxt: t("share"),
    listeningTxt: t("listening"),
  };

  return (
    <div className="container p-3 mx-auto my-3 border shadow-lg bg-slate-100 dark:bg-slate-800 border-1 border-slate-200 dark:border-gray-600 sm:max-w-screen-2xl">
      <HeaderInfo
        reciter={reciter}
        translation={translation}
        surah={surah}
        surahNumber={surah.surahNumber}
        recitationName={getName(recitation, locale)}
        locale={locale}
      />
      <BodyInfo locale={locale} surahText={surah?.verses || []} />
    </div>
  );
}
