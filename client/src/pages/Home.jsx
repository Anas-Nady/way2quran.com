import React from "react";
import bgMainImage from "./../assets/imgs/6320287.jpg";
import logo from "./../assets/imgs/logo.svg";
import { useTranslation } from "react-i18next";
import { HelmetConfig, TopReciters } from "../components";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <HelmetConfig title={t("titleHome")} />
      <section
        className={`max-w-screen-xl mx-auto  flex justify-center items-center gap-2 min-h-[650px] bg-slate-100 dark:bg-gray-700`}
      >
        <div className="flex gap-2 justify-between items-center flex-wrap">
          <p className="text-xl">{t("welcomeTxt")}</p>
          <img src={logo} alt="way2quran logo" width={200} />
        </div>
      </section>

      <TopReciters />
    </>
  );
};

export default Home;
