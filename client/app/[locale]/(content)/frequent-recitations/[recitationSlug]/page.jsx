import HeadingPage from "@/components/HeadingPage";
import Pagination from "@/components/Pagination";
import ReciterCard from "@/components/Reciter/ReciterCard";
import { listAllReciters } from "@/actions/reciters";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import shareMetadata from "../../_shareMetadata";
import Error from "@/components/Error";
import getName from "@/utils/getNameForCurrentLang";
import { getRecitation } from "@/actions/recitations";

async function getRecitationInfo(slug) {
  const res = await getRecitation(slug);
  if (!res.ok) return null;

  const data = await res.json();
  return data.recitation;
}

export async function generateMetadata({ params: { locale, recitationSlug } }) {
  const recitation = await getRecitationInfo(recitationSlug);
  if (!recitation) return null;

  const pageUrl = `frequent-recitations/${recitationSlug}`;
  const recitationName = getName(recitation, locale);
  return shareMetadata({ title: recitationName, locale, pageUrl });
}

export default async function FrequentRecitersPage({
  params: { locale, recitationSlug },
  searchParams,
}) {
  const t = await getTranslations({ locale });
  const currentPage = searchParams?.currentPage || 1;

  const recitation = await getRecitationInfo(recitationSlug);
  if (!recitation) {
    return <Error message={"Failed to get the recitation details"} />;
  }

  const resReciters = await listAllReciters({
    recitationSlug,
    currentPage,
    cache: true,
  });

  const recitersData = await resReciters.json();
  if (!resReciters.ok) {
    return <Error message={recitersData.message} />;
  }

  const { reciters, pagination } = recitersData;

  const recitationName = getName(recitation, locale);

  if (reciters.length === 0) {
    notFound();
  }

  return (
    <section className="relative p-4 mx-auto bg-white border max-w-screen-2xl border-1 border-slate-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="relative flex flex-wrap items-center gap-2">
        <span className="flex-1 min-w-[250px]  overflow-x-auto no-overflow-style">
          <HeadingPage name={recitationName} isCentring={true} />
        </span>
      </div>
      <>
        <div className="flex flex-wrap content-start justify-center min-h-screen gap-2 my-6">
          {reciters.map((reciter) => (
            <ReciterCard
              key={reciter.slug}
              reciter={reciter}
              recitationSlug={recitationSlug}
            />
          ))}
        </div>
        <Pagination
          currentPage={pagination.page || 0}
          totalPages={pagination.pages || 0}
          pageTxt={t("page")}
          ofTxt={t("of")}
        />
      </>
    </section>
  );
}
