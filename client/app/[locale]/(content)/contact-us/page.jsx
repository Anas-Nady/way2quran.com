import ContactUsForm from "./_ContactUsForm";
import HeadingPage from "@/components/HeadingPage";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import shareMetadata from "../_shareMetadata";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "ContactUsPage" });
  const title = t("contactTitle");
  const pageUrl = `/${locale}/contact-us`;

  return shareMetadata({ title, locale, pageUrl });
}

export default function Contact() {
  const t = useTranslations("ContactUsPage");

  const translations = {
    labelEmail: t("email"),
    labelName: t("name"),
    labelTextarea: t("textarea"),
    btnText: t("sendMessageBtn"),
    successCreatedMessageTxt: t("successCreatedMessage"),
  };

  return (
    <div className="relative my-10">
      <HeadingPage name={t("contactTitle")} color="orange" />
      <div className="container max-w-lg">
        <p className="mt-3 text-center text-gray-500 dark:text-white ">
          {t("contactDescription")}
        </p>
        <ContactUsForm {...translations} />
      </div>
    </div>
  );
}
