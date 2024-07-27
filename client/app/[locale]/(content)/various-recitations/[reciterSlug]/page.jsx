import ReciterInfo from "@/components/Reciter/ReciterInfo";
import getSocialMediaPhoto from "@/utils/getSocialMediaPhoto";
import {
  getReciterDetails,
  getReciterInfo,
  getRecitersWithoutCache,
} from "@/actions/reciters";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { HAFS_AN_ASIM, VARIOUS_RECITATIONS } from "@/constants/recitationsName";
import shareMetadata from "../../_shareMetadata";
import Error from "@/components/Error";
import getName from "@/utils/getNameForCurrentLang";

export async function generateMetadata({ params: { locale, reciterSlug } }) {
  const data = await getReciterInfo(reciterSlug);
  if (!data) return null;

  const { reciter } = data;

  const title = getName(reciter, locale);
  const pageUrl = `${VARIOUS_RECITATIONS}/${reciterSlug}`;
  const photo = getSocialMediaPhoto(reciter.photo);

  return shareMetadata({ title, locale, pageUrl, photo });
}

export async function generateStaticParams() {
  const res = await getRecitersWithoutCache({
    recitationSlug: VARIOUS_RECITATIONS,
    pageSize: 9000,
  });

  const data = await res.json();

  const { reciters } = data;

  return reciters.map((reciter) => ({
    reciterSlug: reciter.slug,
  }));
}

export default async function ReciterPage({ params: { locale, reciterSlug } }) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("ReciterPage");
  const res = await getReciterDetails(reciterSlug);
  const data = await res.json();

  if (!res.ok) {
    return <Error message={data.message} />;
  }

  const { reciter, recitations } = data;

  const translations = {
    listeningTxt: t("listening"),
    downloadTxt: t("download"),
    shareTxt: t("share"),
    downloadAllTxt: t("downloadAll"),
    topRecitersTxt: t("topReciters"),
    playingThePlaylistTxt: t("playingThePlaylist"),
  };

  return (
    <div>
      <ReciterInfo
        reciter={reciter}
        currentLang={locale}
        recitations={recitations}
        {...translations}
        recitationSlug={HAFS_AN_ASIM}
      />
    </div>
  );
}
