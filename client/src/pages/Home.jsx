import React from "react";
import { useTranslation } from "react-i18next";
import { HelmetConfig, TopReciters } from "../components";

const Home = () => {
  const { t, i18n } = useTranslation();

  const handleText = () => {
    if (i18n.language == "ar") {
      return (
        <>
          تلاوات <span className="text-green-500"> للقرآن الكريم </span>من أنحاء
          العالم الإسلامى
        </>
      );
    } else {
      return (
        <>
          Recitations of <span className="text-green-500">the Holy Quran</span>{" "}
          from around the Islamic world
        </>
      );
    }
  };

  const sectionStyle = {
    backgroundImage: `url('https://storage.googleapis.com/way2quran_storage/imgs/main-bg.svg')`, // Adjust the path to your background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <HelmetConfig title={t("titleHome")} />
      <div
        style={sectionStyle}
        className={`max-w-screen-3xl mx-auto flex justify-center items-center gap-2 min-h-[750px] bg-slate-200 dark:bg-gray-700`}
      >
        <div className="flex gap-2 justify-between items-center flex-wrap container p-8 ">
          <p className="text-sm md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl text-gray-900 font-semibold mx-9 dark:text-white leading-[50px] max-w-[790px]">
            {handleText()}
          </p>
          <img
            src="https://storage.googleapis.com/way2quran_storage/imgs/full-logo.svg"
            alt="way2quran logo"
            width={500}
          />
        </div>
      </div>

      <TopReciters />
    </>
  );
};

export default Home;
