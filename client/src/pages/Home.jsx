import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bgMainImage from "./../assets/imgs/bg-main.jpeg";
import { rightArrow } from "./../components/Icons";
import { useTranslation } from "react-i18next";
import { TopReciters } from "../components";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <section
        className={`bg-center bg-no-repeat max-w-full  dark:bg-gray-700 bg-slate-50 bg-blend-multiply`}
        style={{ backgroundImage: `url(${bgMainImage})`, opacity: 0.8 }}
      >
        <div className="px-4 flex flex-col gap-2 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-xl font-extrabold leading-8 text-white md:text-3xl lg:text-4xl">
            {t("welcomeTxt")}
          </h1>
          {/* <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p> */}
          <div className="flex flex-col space-y-4  duration-100 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/completed-reciters"
              className="inline-flex gap-2 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              {t("welcomeBtn")}
              <span className="rtl:rotate-180">{rightArrow}</span>
            </Link>
          </div>
        </div>
      </section>

      <TopReciters />
    </>
  );
};

export default Home;
