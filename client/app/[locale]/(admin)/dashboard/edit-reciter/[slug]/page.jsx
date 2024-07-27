import { getReciterDetailsWithoutCache } from "@/actions/reciters";
import Form from "./_Form";
import Accordion from "./_Accordion";
import { getTranslations } from "next-intl/server";
import NotFound from "../../_components/NotFound";
import Error from "@/components/Error";

export default async function EditReciterPage({
  params: { locale, slug },
  searchParams,
}) {
  const t = await getTranslations({ locale, namespace: "EditReciterPage" });
  const res = await getReciterDetailsWithoutCache(slug);
  const data = await res.json();

  if (!res.ok && res.status !== 200) {
    return <Error message={data.message} />;
  }

  const { reciter, recitations } = data;

  const translations = {
    numberTxt: t("reciterNumber"),
    arNameTxt: t("arName"),
    enNameTxt: t("enName"),
    photoTxt: t("photo"),
    saveTxt: t("save"),
    topRecitersTxt: t("topReciters"),
    notFoundDataTxt: t("notFoundData"),
    confirmDeleteTxt: t("confirmDelete"),
  };

  return (
    <div className="relative flex flex-wrap items-start justify-between gap-4 px-4">
      <Form
        searchParams={searchParams}
        currentLang={locale}
        reciter={reciter}
        {...translations}
      />
      <Accordion
        recitations={recitations}
        reciterSlug={slug}
        currentLang={locale}
        notFoundDataTxt={t("notFoundData")}
        recitationNumberTxt={t("recitationNumber")}
        confirmDeleteTxt={t("confirmDelete")}
        fileTxt={t("file")}
      />
      {recitations.length == 0 && (
        <NotFound notFoundDataTxt={translations.notFoundDataTxt} />
      )}
    </div>
  );
}
