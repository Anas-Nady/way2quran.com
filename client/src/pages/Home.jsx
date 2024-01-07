import React from "react";
import { useTranslation } from "react-i18next";
import { HelmetConfig, Layout, TopReciters } from "../components";

const Home = () => {
  const { t } = useTranslation();

  const sectionStyle = {
    backgroundImage: `url('https://storage.googleapis.com/way2quran_storage/imgs/main-bg.svg')`, // Adjust the path to your background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <HelmetConfig title={t("titleHome")} />
      <Layout>
        <div
          style={sectionStyle}
          className={`max-w-screen-3xl mx-auto -mt-[1rem] -me-2 -ms-2 flex items-center  gap-2 min-h-[750px] bg-slate-200 dark:bg-gray-700`}
        >
          <div className="flex flex-wrap gap-2 max-w-screen-2xl items-center mx-auto text-center w-full p-8 ">
            <p
              className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mx-auto text-gray-900 font-semibold dark:text-white leading-[40px] max-w-[950px]"
              dangerouslySetInnerHTML={{ __html: t("welcomeTxt") }}
            />
            <div className="mx-auto sm:me-auto">
              <img
                src="https://storage.googleapis.com/way2quran_storage/imgs/full-logo.png"
                alt="way2quran logo"
                className="w-[400px] xl:w-[600px] mx-auto 2xl:mx-0 "
              />
            </div>
          </div>
        </div>
      </Layout>
      <TopReciters />
    </>
  );
};

export default Home;
