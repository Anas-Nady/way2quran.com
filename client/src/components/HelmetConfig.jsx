import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const HelmetConfig = ({ title, otherMetaTags }) => {
  const { t } = useTranslation();
  return (
    <Helmet>
      <title>{`${title} | way2quran`}</title>
      <meta name="description" content={t("description")} />
      <meta name="keywords" content={`${t("keywords")}`} />
      <meta name="author" content="Anas Nady" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`${window.location.href}`} />
      {otherMetaTags &&
        otherMetaTags.map((tag, index) => <meta key={index} {...tag} />)}

      <meta property="og:title" content="Way2quran.com" />
      <meta property="og:description" content={t("description")} />
      <meta
        property="og:image"
        content="URL to an image representing your website"
      />
      <meta property="og:url" content="https://way2quran.com" />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default HelmetConfig;
