import { useTranslations } from "next-intl";

export default function NotFoundData() {
  const t = useTranslations();
  return (
    <div className="flex justify-center items-center my-2">
      <p className="text-gray-900 dark:text-slate-50 text-lg sm:text-xl lg:text-2xl">
        {t("notFoundData")}
      </p>
    </div>
  );
}
