import { useTranslations } from "next-intl";
import { kufiArabicFont } from "@/assets/fonts";

const SiteTitle = ({ locale }: { locale: string }) => {
  const t = useTranslations();

  return (
    <span
      className={`self-center ${locale === "ar" && kufiArabicFont.className} ${
        locale == "ar" ? "font-kufiArabic" : "font-english"
      }  text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold capitalize -tracking-wider whitespace-nowrap dark:text-white`}
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
