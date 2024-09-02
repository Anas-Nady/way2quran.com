import ReciterInfo from "@/components/Reciter/ReciterInfo";
import getSocialMediaPhoto from "@/utils/getSocialMediaPhoto";
import {
  getReciterDetails,
  getReciterInfo,
  getRecitersWithoutCache,
} from "@/actions/reciters";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import shareMetadata from "../../../_shareMetadata";
import Error from "@/components/Error";
import getName from "@/utils/getNameForCurrentLang";
import { getRecitations } from "@/actions/recitations";

export async function generateMetadata({
  params: { locale, recitationSlug, reciterSlug },
}) {
  const data = await getReciterInfo(reciterSlug);
  if (!data) return null;

  const { reciter } = data;

  const title = getName(reciter, locale);
  const pageUrl = `frequent-recitations/${recitationSlug}/${reciterSlug}`;
  const photo = getSocialMediaPhoto(reciter.photo);

  return shareMetadata({
    title,
    locale,
    pageUrl,
    photo,
  });
}

export async function generateStaticParams() {
  const resRecitations = await getRecitations();

  const dataRecitations = await resRecitations.json();
  const { recitations } = dataRecitations;

  const paths = [];

  for (const recitation of recitations) {
    // Fetch reciters for each recitation
    const recitersRes = await getRecitersWithoutCache({
      recitationSlug: recitation.slug,
      pageSize: 9000,
    });

    const recitersData = await recitersRes.json();
    const reciters = recitersData.reciters;

    // Generate paths
    for (const reciter of reciters) {
      paths.push({
        recitationSlug: recitation.slug,
        reciterSlug: reciter.slug,
      });
    }
  }

  return paths;
}

export default async function ReciterPage({
  params: { locale, reciterSlug, recitationSlug },
}) {
  unstable_setRequestLocale(locale);
  const res = await getReciterDetails(reciterSlug);
  const data = await res.json();
  const t = await getTranslations("ReciterPage");

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
      />
    </div>
  );
}
