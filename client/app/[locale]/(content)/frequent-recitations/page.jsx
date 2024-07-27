import HeadingPage from "@/components/HeadingPage";
import Recitation from "./_Recitation";
import { getRecitations } from "@/actions/recitations";
import { getTranslations } from "next-intl/server";
import shareMetadata from "../_shareMetadata";
import Error from "@/components/Error";

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
  const res = await getRecitations();

  if (!res.ok) {
    return <Error message={"Failed to get recitations"} />;
  }

  const data = await res.json();

  const { recitations } = data;
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
