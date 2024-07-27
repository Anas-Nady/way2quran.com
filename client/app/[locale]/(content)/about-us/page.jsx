import HeadingPage from "@/components/HeadingPage";
import { noteIcon } from "@/components/Icons";
import socialMediaLinks from "@/constants/socialMediaLinks";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import shareMetadata from "../_shareMetadata";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const title = t("aboutTitle");
  const pageUrl = `/${locale}/about-us`;

  return shareMetadata({title, locale, pageUrl});
}

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <>
      <div className="my-10">
        <div className="text-center about-us">
          <HeadingPage name={t("aboutTitle")} color="orange" />

          <div className="max-w-screen-lg mx-auto ">
            <ul className="flex flex-col flex-wrap items-start justify-start gap-4 px-3 list-none text-start">
              {Array.from({ length: 5 }, (_, index) => (
                <li
                  key={index + 1}
                  className="flex justify-center text-gray-900 text-md sm:text-xl dark:text-slate-50"
                >
                  <span>{noteIcon}</span>
                  {t(`about_${index + 1}`)}
                </li>
              ))}
            </ul>

            <div className="flex justify-center gap-3 mt-8 social-media-links">
              {socialMediaLinks.map((link, i) => (
                <a key={i} href={link.href} target="_blank">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
