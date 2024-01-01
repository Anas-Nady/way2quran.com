import React from "react";
import logo from "./../assets/imgs/logo-1.svg";
import { useTranslation } from "react-i18next";
import { HelmetConfig, TopReciters } from "../components";
import bgMain from "./../assets/imgs/hero-bg.svg";

const Home = () => {
  const { t } = useTranslation();

  const sectionStyle = {
    backgroundImage: `url(${bgMain})`, // Adjust the path to your background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <HelmetConfig title={t("titleHome")} />
      <section
        style={sectionStyle}
        className={`max-w-screen-3xl mx-auto  flex justify-center items-center gap-2 min-h-[650px] bg-slate-100 dark:bg-gray-700`}
      >
        <div className="flex gap-2 justify-between items-center flex-wrap container p-8 ">
          <p className="text-sm md:text-lg lg:text-xl xl:text-3xl text-gray-900 font-semibold mx-9 dark:text-white">
            تلاوات <span className="text-green-500"> للقرآن الكريم </span>من
            أنحاء العالم الإسلامى
          </p>
          <img src={logo} alt="way2quran logo" width={500} />
        </div>
      </section>

      <TopReciters />
    </>
  );
};

export default Home;
