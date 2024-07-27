import { baseURL } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { icon } from "./images";
import { socialMediaPhoto } from "@/constants/images";

const rootMetadata = async function (locale) {
  const t = await getTranslations({ locale });

  return {
    title: {
      default: `${t("title")}`,
      template: `%s | ${t("titleHome")}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: `${t("titleHome")}` }],
    manifest: `${baseURL}/manifest.json`,
    creator: "Anas Abdallah Nady",
    applicationName: t("titleHome"),
    appleMobileWebAppTitle: t("titleHome"),
    hreflang: [
      {
        lang: "ar",
        href: `${baseURL}/ar`,
      },
      {
        lang: "en",
        href: `${baseURL}/en`,
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
      url: `${baseURL}/${locale}`,
    },
    openGraph: {
      title: t("titleHome"),
      description: t("description"),
      siteName: t("titleHome"),
      images: [socialMediaPhoto],
      url: `${baseURL}/${locale}`,
      type: "website",
    },
    metadataBase: new URL(`${baseURL}`),
    alternates: {
      canonical: `${baseURL}/${locale}`,
      languages: {
        en: `${baseURL}/en`,
        ar: `${baseURL}/ar`,
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
