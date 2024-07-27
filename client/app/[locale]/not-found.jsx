import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="flex justify-center my-2 min-h-screen">
      <p className="text-gray-900 dark:text-slate-50 text-lg sm:text-xl lg:text-2xl">
        {t("notFoundData")}
      </p>
    </div>
  );
}
