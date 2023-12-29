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
        className={`max-w-screen-xl mx-auto  flex justify-between items-center gap-2 min-h-[650px] bg-slate-100 dark:bg-gray-700`}
      >
        {/* <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p> */}
        {/* <div className="flex flex-col space-y-4  duration-100 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/completed-reciters"
              className="inline-flex gap-2 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              {t("welcomeBtn")}
              <span className="rtl:rotate-180">{rightArrow}</span>
            </Link>
          </div> */}
      </section>

      <TopReciters />
    </>
  );
};

export default Home;
