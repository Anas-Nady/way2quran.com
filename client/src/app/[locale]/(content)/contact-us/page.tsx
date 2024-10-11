import ContactUsForm from "./_ContactUsForm";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import PageHeading from "@/components/ui/PageHeading";
import shareMetadata from "@/app/[locale]/(content)/_shareMetadata";

export async function generateMetadata({ params: { locale } }: PageParams) {
  const t = await getTranslations({ locale, namespace: "ContactUsPage" });
  const title = t("contactTitle");
  const pageUrl = `/${locale}/contact-us`;

  return shareMetadata({ title, locale, pageUrl });
}

export default function Contact() {
  const t = useTranslations("ContactUsPage");

  return (
    <div className="relative my-10">
      <PageHeading text={t("contactTitle")} color="orange" />
      <div className="container max-w-lg">
        <p className="mb-5 text-center text-gray-600 text-md sm:text-lg dark:text-gray-400">
          {t("contactDescription")}
        </p>
        <ContactUsForm />
      </div>
    </div>
  );
}
