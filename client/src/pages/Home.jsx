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
        className={`max-w-screen-3xl mx-auto -mt-[1rem] -me-2 -ms-2 flex items-center  gap-2 min-h-[750px] bg-slate-200 dark:bg-gray-700`}
      >
        <div className="flex gap-2  items-center mx-auto text-center flex-wrap w-full p-8 ">
          <p className="text-3xl xl:text-5xl 2xl:text-6xl mx-auto text-gray-900 font-semibold  dark:text-white leading-[35px] max-w-[990px]">
            {handleText()}
          </p>
          <img
            src="https://storage.googleapis.com/way2quran_storage/imgs/full-logo.svg"
            alt="way2quran logo"
            className="w-[400px] xl:w-[500px]  mx-auto 2xl:mx-0"
          />
        </div>
      </div>

      <TopReciters />
    </>
  );
};

export default Home;
