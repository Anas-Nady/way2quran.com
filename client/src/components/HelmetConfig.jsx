import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const HelmetConfig = ({ title = "", otherMetaTags }) => {
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
    </Helmet>
  );
};

export default HelmetConfig;
