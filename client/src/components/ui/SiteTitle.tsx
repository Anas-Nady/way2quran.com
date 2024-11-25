import { useTranslations } from "next-intl";

const SiteTitle = () => {
  const t = useTranslations();

  return (
    <span
      className={`self-center font-kufiArabic text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold capitalize -tracking-wider whitespace-nowrap dark:text-white`}
    >
      <span className="text-orange-500 dark:text-orange-500">
        {t("wayTo")}
        <span className="text-green-500 dark:text-green-500">
          {" "}
          {t("quran")}
        </span>
      </span>
    </span>
  );
};

export default SiteTitle;
