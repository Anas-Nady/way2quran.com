import {
  getReciterDetails,
  getReciterInfo,
  listAllReciters,
} from "@/actions/reciters";
import { unstable_setRequestLocale } from "next-intl/server";
import getSocialMediaPhoto from "@/helpers/getSocialMediaPhoto";
import shareMetadata from "../../_shareMetadata";
import getName from "@/helpers/getNameForCurrentLang";
import ErrorAlert from "@/components/common/ErrorAlert";
import ReciterDetails from "@/components/Reciter/ReciterDetails";
import React from "react";
import { PageParams } from "@/types/types";
import { RECITATIONS } from "@/constants/Recitations";

type ReciterPageProps = PageParams & {
  params: { slug: string };
};

export async function generateMetadata({
  params: { locale, slug },
}: ReciterPageProps) {
  const data = await getReciterInfo(slug);
  if (!data) return null;

  const { reciter } = data;

  const title = getName(reciter, locale);
  const pageUrl = `/reciters/${slug}`;
  const photo = getSocialMediaPhoto(reciter.photo);

  return shareMetadata({
    title,
    locale,
    pageUrl,
    photo,
  });
}

export async function generateStaticParams() {
  const paths = [];

  for (const recitation of RECITATIONS) {
    const recitersRes = await listAllReciters({
      recitationSlug: recitation.slug,
      pageSize: 9000,
    });

    const recitersData = await recitersRes.json();
    const reciters = recitersData.reciters;

    // Generate paths
    for (const reciter of reciters) {
      paths.push({
        slug: reciter.slug,
      });
    }
  }

  return paths;
}

const ReciterPage: React.FC<ReciterPageProps> = async ({
  params: { locale, slug },
}) => {
  unstable_setRequestLocale(locale);

  const res = await getReciterDetails({
    reciterSlug: slug,
    increaseViews: true,
  });
  const data = await res.json();

  if (!res.ok) {
    return <ErrorAlert message={data.message} />;
  }

  const { reciter, recitations } = data;

  return (
    <div>
      <ReciterDetails
        reciter={reciter}
        locale={locale}
        recitations={recitations}
      />
    </div>
  );
};

export default ReciterPage;
