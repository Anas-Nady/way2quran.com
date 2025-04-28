import React from "react";
import { getReciterDetails, getReciterInfo } from "@/actions/reciters";
import getSocialMediaPhoto from "@/helpers/getSocialMediaPhoto";
import shareMetadata from "../../_shareMetadata";
import getName from "@/helpers/getNameForCurrentLang";
import ErrorAlert from "@/components/common/ErrorAlert";
import ReciterDetails from "@/components/Reciter/ReciterDetails";

interface ReciterPageProps {
  params: { slug: string; locale: "ar" | "en" };
}

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

const ReciterPage: React.FC<ReciterPageProps> = async ({
  params: { locale, slug },
}) => {
  const res = await getReciterDetails({
    reciterSlug: slug,
    increaseViews: true,
  });
  const data = await res.json();

  if (!res.ok) {
    return <ErrorAlert message={data.message} />;
  }

  const { reciter } = data;

  return (
    <div>
      <ReciterDetails
        reciter={reciter}
        locale={locale}
        recitations={reciter?.recitations}
      />
    </div>
  );
};

export default ReciterPage;
