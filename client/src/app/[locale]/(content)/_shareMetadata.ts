import { socialMediaPhoto } from "@/constants/Images";
import { CLIENT_URL } from "@/lib/Api";
import { LocaleProps } from "@/types/types";

type ShareMetadataProps = LocaleProps & {
  title: string;
  pageUrl: string;
  photo?: string;
};

const shareMetadata = async function ({
  title,
  locale,
  pageUrl,
  photo = socialMediaPhoto,
}: ShareMetadataProps) {
  return {
    title,
    twitter: {
      title,
      url: `${CLIENT_URL}/${locale}/${pageUrl}`,
      images: [photo],
    },
    openGraph: {
      title,
      url: `${CLIENT_URL}/${locale}/${pageUrl}`,
      images: [photo],
    },
    metadataBase: new URL(`${CLIENT_URL}`),
    alternates: {
      canonical: `/${pageUrl}`,
      languages: {
        en: `/en/${pageUrl}`,
        ar: `/ar/${pageUrl}`,
      },
    },
  };
};

export default shareMetadata;
