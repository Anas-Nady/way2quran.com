import SearchInput from "@/components/SearchInput";
import CheckboxFilter from "./_CheckboxFilter";
import Pagination from "@/components/Pagination";
import { getTranslations } from "next-intl/server";
import { getRecitersWithoutCache, listAllReciters } from "@/actions/reciters";
import Table from "./_Table";
import SelectTypeRecitation from "./_SelectTypeRecitation";
import {
  COMPLETED_RECITATIONS,
  VARIOUS_RECITATIONS,
} from "@/constants/recitationsName";
import Link from "next/link";
import Error from "@/components/Error";

export default async function AllRecitersPage({
  params: { locale },
  searchParams,
}) {
  const t = await getTranslations({ locale, namespace: "AllRecitersPage" });
  const recitationSlug = searchParams?.recitationSlug || "";
  const search = searchParams?.search || "";
  const currentPage = searchParams?.currentPage || 1;
  const isTopReciter = searchParams.isTopReciter || "";
  const sortBy = searchParams?.sortBy == "true" ? "-totalViewers" : "-number";
  const res = await getRecitersWithoutCache({
    recitationSlug,
    isTopReciter,
    search,
    currentPage,
    sortBy,
  });

  const data = await res.json();

  if (!res.ok) {
    return <Error message={data.message} />;
  }

  const { reciters, pagination } = data;

  const options = [
    { slug: "", label: t("allReciters") },
    { slug: COMPLETED_RECITATIONS, label: t("completedRecitations") },
    { slug: VARIOUS_RECITATIONS, label: t("variousRecitations") },
  ];

  const tHeadTranslation = {
    reciterNameTxt: t("reciterName"),
    recitationsNumberTxt: t("recitationsNumber"),
    topRecitersTxt: t("topReciters"),
    actionsTxt: t("actions"),
    createdAtTxt: t("createdAt"),
    confirmDeleteTxt: t("confirmDelete"),
    totalViewersTxt: t("totalViewers"),
  };

  return (
    <div className="relative content">
      <form className="flex flex-col flex-wrap items-start justify-between gap-3">
        <SearchInput searchPlaceholder={t("searchPlaceholder")} />
        <SelectTypeRecitation
          options={options}
          placeholder={t("chooseTypeOfRecitation")}
        />
        <div className="flex gap-5">
          <CheckboxFilter
            labelText={t("topReciters")}
            filterOption={"isTopReciter"}
          />
          <CheckboxFilter
            labelText={t("mostViewers")}
            filterOption={"sortBy"}
          />
        </div>
        <Link
          href={`/${locale}/dashboard/all-reciters`}
          className="text-lg hover:underline text-sky-500"
        >
          {t("resetFilters")}
        </Link>
      </form>

      <section>
        <div className="relative min-h-screen shadow-md reciter sm:rounded-lg">
          {reciters && (
            <Table
              reciters={reciters}
              currentLang={locale}
              {...tHeadTranslation}
            />
          )}
        </div>
      </section>
      <Pagination
        pageTxt={t("page")}
        ofTxt={t("of")}
        currentPage={pagination?.page || 0}
        totalPages={pagination?.pages || 0}
      />
    </div>
  );
}
