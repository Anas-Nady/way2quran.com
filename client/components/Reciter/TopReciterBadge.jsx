import { useTranslations } from "next-intl";
import { starIcon } from "../Icons";

export default function TopReciterBadge() {
  const t = useTranslations("ReciterPage");

  return (
    <div className="flex items-center gap-1 mb-2 text-white">
      <span className="text-yellow-300">{starIcon}</span>
      <span className="text-lg font-semibold text-gray-900 dark:text-slate-50">
        {t("topReciters")}
      </span>
    </div>
  );
}
