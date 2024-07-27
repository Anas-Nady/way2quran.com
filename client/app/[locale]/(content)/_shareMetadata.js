const { socialMediaPhoto } = require("@/constants/images");
const { baseURL } = require("@/lib/api");

const shareMetadata = async function ({
  title,
  locale,
  pageUrl,
  photo = socialMediaPhoto,
}) {
  return {
    title,
    twitter: {
      title,
      url: `${baseURL}/${locale}/${pageUrl}`,
      images: [photo],
    },
    openGraph: {
      title,
      url: `${baseURL}/${locale}/${pageUrl}`,
      images: [photo],
    },
    metadataBase: new URL(`${baseURL}`),
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
