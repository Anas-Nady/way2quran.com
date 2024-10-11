import React, { Suspense } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { HAFS_AN_ASIM } from "@/constants/Recitations";
import SliderReciters from "./Slider";
import { useTranslations } from "next-intl";
import { listAllReciters } from "@/actions/reciters";

const TopReciters: React.FC<LocaleProps> = ({ locale }) => {
  const t = useTranslations();

  const Slider: React.FC = async () => {
    try {
      const res = await listAllReciters({
        recitationSlug: HAFS_AN_ASIM,
        isTopReciter: true,
        sortBy: "-totalViewers",
        pageSize: 9,
      });

      if (!res.ok) return null;

      const data = await res.json();
      const { reciters } = data;

      return <SliderReciters reciters={reciters} locale={locale} />;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <section className="px-5 mx-auto text-gray-900 max-w-screen-2xl">
      <h2
        className={`my-5 relative whitespace-nowrap text-gray-700 mx-auto sm:mx-0 text-4xl rtl:lg:text-4xl ltr:xl:text-4xl rtl:2xl:text-5xl ltr:2xl:text-5xl
        text-center font-bold pb-2 dark:text-slate-50 w-fit cursor-default`}
      >
        <span className={`text-green-500 dark:text-green-500`}>
          {t("listeningNow")}
        </span>
        <span className="w-32 h-1 bg-gray-300 dark:bg-gray-600 absolute left-[50%] -bottom-1 -translate-x-1/2 rounded"></span>
      </h2>
      <Suspense fallback={<LoadingSpinner />}>
        <Slider />
      </Suspense>
    </section>
  );
};

export default TopReciters;
