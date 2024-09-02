import { useTranslations } from "next-intl";
import MessageList from "./_MessageList";

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
      <MessageList
        {...translations}
        currentLang={locale}
        searchParams={searchParams}
      />
    </div>
  );
}
