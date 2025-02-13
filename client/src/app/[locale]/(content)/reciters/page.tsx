import ReciterCard from "@/components/Reciter/ReciterCard";
import { listAllReciters } from "@/actions/reciters";
import NotFound from "../../not-found";
import shareMetadata from "../_shareMetadata";
import ErrorAlert from "@/components/common/ErrorAlert";
import PageHeading from "@/components/ui/PageHeading";
import SearchInput from "@/components/ui/SearchInput";
import Pagination from "@/components/common/Pagination";
import RECITATIONS_LIST from "@/constants/Recitations";
import getName from "@/helpers/getNameForCurrentLang";

function getSelectedRecitation(slug: string): LocalizedEntity {
  return (
    RECITATIONS_LIST.find((rec: LocalizedEntity) => rec.slug === slug) ||
    RECITATIONS_LIST[2]
  ); // HAFS-AS-ASIM
}

interface RecitersProps extends PageParams {
  searchParams: SearchParams;
}

export async function generateMetadata({
  params: { locale },
  searchParams,
}: RecitersProps) {
  const recitationInfo = getSelectedRecitation(searchParams.recitationSlug);
  const recitationSlug = recitationInfo.slug;
  const recitationName = recitationInfo ? getName(recitationInfo, locale) : "";

  return shareMetadata({
    title: recitationName,
    locale,
    pageUrl: recitationSlug,
  });
}

export default async function RecitersPage({
  params: { locale },
  searchParams,
}: RecitersProps) {
  const search = searchParams?.search || "";
  const currentPage = searchParams?.currentPage || 1;
  const recitationInfo = getSelectedRecitation(searchParams.recitationSlug);
  const recitationSlug = recitationInfo.slug;

  const recitationName = recitationInfo ? getName(recitationInfo, locale) : "";

  const res = await listAllReciters({
    recitationSlug,
    search,
    currentPage,
  });
  const data = await res.json();

  if (!res.ok) {
    return <ErrorAlert message={data?.message} />;
  }

  const { reciters, pagination } = data;

  return (
    <section className="relative p-4 mx-auto bg-white border max-w-screen-2xl border-1 border-slate-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="flex flex-col-reverse items-center justify-between gap-4 mb-6 md:flex-row">
        <div className="w-full md:w-1/4">
          <SearchInput />
        </div>
        <div className="w-full md:w-2/4">
          <PageHeading text={recitationName} />
        </div>
        <div className="w-full md:w-1/4"></div>
      </div>
      <div className="flex flex-wrap content-start justify-center gap-2 my-6">
        {reciters.map((reciter: ReciterProfile) => {
          return (
            <ReciterCard
              key={reciter.slug}
              locale={locale}
              reciter={reciter}
              recitationSlug={recitationSlug}
            />
          );
        })}
        {reciters?.length === 0 && <NotFound />}
      </div>
      <Pagination
        currentPage={pagination.page || 0}
        totalPages={pagination.pages || 0}
      />
    </section>
  );
}
