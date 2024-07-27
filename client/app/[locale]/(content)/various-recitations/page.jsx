import HeadingPage from "@/components/HeadingPage";
import Pagination from "@/components/Pagination";
import ReciterCard from "@/components/Reciter/ReciterCard";
import { listAllReciters } from "@/actions/reciters";
import { getTranslations } from "next-intl/server";
import SearchInput from "@/components/SearchInput";
import NotFound from "../../not-found";
import { HAFS_AN_ASIM, VARIOUS_RECITATIONS } from "@/constants/recitationsName";
import shareMetadata from "../_shareMetadata";
import Error from "@/components/Error";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({
    locale,
    namespace: "VariousRecitationsPage",
  });
  const pageUrl = VARIOUS_RECITATIONS;
  const title = t("variousRecitations");

  return shareMetadata({ title, locale, pageUrl });
}

export default async function VariousRecitationsPage({
  params: { locale },
  searchParams,
}) {
  const t = await getTranslations({
    locale,
    namespace: "VariousRecitationsPage",
  });

  const search = searchParams?.search || "";
  const currentPage = searchParams?.currentPage || 1;
  const res = await listAllReciters({
    recitationSlug: VARIOUS_RECITATIONS,
    search,
    currentPage,
    cache: true,
  });
  const data = await res.json();

  if (!res.ok) {
    return <Error message={data.message} />;
  }

  const { reciters, pagination } = data;

  return (
    <section className="relative p-4 mx-auto bg-white border max-w-screen-2xl border-1 border-slate-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="relative flex flex-col flex-wrap items-center justify-center lg:flex-row lg:justify-start lg:gap-5">
        <span className="flex-1 min-w-[250px]">
          <HeadingPage name={t("variousRecitations")} />
        </span>
        <form className="relative lg:absolute lg:left-0 lg:rtl:right-0 ">
          <SearchInput searchPlaceholder={t("searchPlaceholder")} />
        </form>
      </div>
      <>
        <div className="flex flex-wrap content-start justify-center gap-2 my-6">
          {reciters?.map((reciter) => {
            return (
              <ReciterCard
                key={reciter.slug}
                reciter={reciter}
                recitationSlug={HAFS_AN_ASIM}
              />
            );
          })}
          {reciters?.length === 0 && <NotFound />}
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
