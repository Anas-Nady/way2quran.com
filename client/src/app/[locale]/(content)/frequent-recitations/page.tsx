import { getTranslations } from "next-intl/server";
import shareMetadata from "../_shareMetadata";
import RecitationCard from "./_RecitationCard";
import PageHeading from "@/components/ui/PageHeading";
import RECITATIONS_LIST from "@/constants/Recitations";

export async function generateMetadata({ params: { locale } }: PageParams) {
  const t = await getTranslations({ locale });
  const pageUrl = `frequent-recitations`;
  const title = t("frequentRecitations");

  return shareMetadata({ title, locale, pageUrl });
}

export default async function FrequentRecitations({
  params: { locale },
}: PageParams) {
  const t = await getTranslations({ locale });
  const recitationsList = [...RECITATIONS_LIST].splice(3);

  return (
    <section className="max-w-screen-xl p-4 mx-auto bg-white border border-1 border-slate-200 dark:border-gray-600 dark:bg-gray-800 ">
      <div className="relative flex flex-wrap items-center justify-center gap-2 my-5 lg:justify-start">
        <span className="flex-1 min-w-[250px]">
          <PageHeading text={t("frequentRecitations")} />
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 cards">
        {recitationsList.map((recitation: RecitationMetadata) => (
          <RecitationCard
            key={recitation.slug}
            recitation={recitation}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
