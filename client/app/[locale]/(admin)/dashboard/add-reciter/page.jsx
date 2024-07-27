import AddReciterForm from "./_AddReciterForm";
import { useTranslations } from "next-intl";

export default function AddReciterPage() {
  const t = useTranslations("AddReciter");

  const translations = {
    reciterNumberTxt: t("reciterNumber"),
    enNameTxt: t("enName"),
    arNameTxt: t("arName"),
    saveReciterTxt: t("saveReciter"),
    photoTxt: t("photo"),
    successCreatedReciterTxt: t("successCreatedReciter"),
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="border border-slate-300 dark:border-gray-700  sm:w-[500px] mx-3 p-10">
        <AddReciterForm {...translations} />
      </div>
    </div>
  );
}
