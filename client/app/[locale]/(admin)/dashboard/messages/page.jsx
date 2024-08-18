import { useTranslations } from "next-intl";
import MessageCard from "./_MessageCard";

export default function Messages({ params: { locale }, searchParams }) {
  const t = useTranslations("MessagesPage");

  const translations = {
    notFoundDataTxt: t("notFoundData"),
    nameTxt: t("name"),
    emailTxt: t("email"),
    confirmDeleteTxt: t("confirmDelete"),
  };

  return (
    <div className="relative border-slate-100 dark:border-red-950">
      <MessageCard
        {...translations}
        currentLang={locale}
        searchParams={searchParams}
      />
    </div>
  );
}
