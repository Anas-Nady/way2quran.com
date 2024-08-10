import HeadingPage from "@/components/HeadingPage";
import Recitation from "./_Recitation";
import { getTranslations } from "next-intl/server";
import shareMetadata from "../_shareMetadata";
import recitations from "@/constants/recitations";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({
    locale,
    namespace: "FrequentRecitationsPage",
  });
  const pageUrl = `frequent-recitations`;
  const title = t("frequentRecitations");

  return shareMetadata({ title, locale, pageUrl });
}

export default async function FrequentRecitations({ params: { locale } }) {
  const t = await getTranslations({
    locale,
    namespace: "FrequentRecitationsPage",
  });

  return (
    <section className="max-w-screen-xl p-4 mx-auto bg-white border border-1 border-slate-200 dark:border-gray-600 dark:bg-gray-800 ">
      <div className="relative flex flex-wrap items-center justify-center gap-2 my-5 lg:justify-start">
        <span className="flex-1 min-w-[250px]">
          <HeadingPage name={t("frequentRecitations")} />
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 cards">
        {recitations.map((recitation) => (
          <Recitation key={recitation.slug} data={recitation} />
        ))}
      </div>
    </section>
  );
}
