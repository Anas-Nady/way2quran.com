import { icon, socialMediaPhoto } from "@/constants/Images";
import { CLIENT_URL } from "@/lib/Api";
import { getTranslations } from "next-intl/server";

const rootMetadata = async function (locale: "ar" | "en") {
  const t = await getTranslations({ locale });

  return {
    title: {
      default: `${t("title")}`,
      template: `%s | ${t("titleHome")}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: `${t("titleHome")}` }],
    manifest: `${CLIENT_URL}/manifest.json`,
    creator: "Anas Abdallah Nady",
    applicationName: t("titleHome"),
    appleMobileWebAppTitle: t("titleHome"),
    hreflang: [
      {
        lang: "ar",
        href: `${CLIENT_URL}/ar`,
      },
      {
        lang: "en",
        href: `${CLIENT_URL}/en`,
      },
    ],
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon,
      apple: icon,
    },
    twitter: {
      title: t("titleHome"),
      card: "summary_large_image",
      site: "@way2quran",
      description: t("description"),
      images: [socialMediaPhoto],
      url: `${CLIENT_URL}/${locale}`,
    },
    openGraph: {
      title: t("titleHome"),
      description: t("description"),
      siteName: t("titleHome"),
      images: [socialMediaPhoto],
      url: `${CLIENT_URL}/${locale}`,
      type: "website",
    },
    metadataBase: new URL(`${CLIENT_URL}`),
    alternates: {
      canonical: `${CLIENT_URL}/${locale}`,
      languages: {
        en: `${CLIENT_URL}/en`,
        ar: `${CLIENT_URL}/ar`,
      },
    },
    other: {
      subtitle: `${t("titleHome")}`,
      target: "all",
      handheldFriendly: "True",
      "DC.title": "Unstoppable Robot Ninja",
      coverage: "Worldwide",
      distribution: "Global",
      rating: "General",
    },
  };
};

export default rootMetadata;
