import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { listReciters } from "../redux/actions/reciterAction";
import { ErrorAlert, Spinner, HeadingSection } from ".";
import { listRecitersReset } from "../redux/slices/reciterSlice";

export default function TopReciters() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const currentLang = i18n.language;

  const { loading, reciters, error } = useSelector(
    (state) => state.listReciters
  );

  useEffect(() => {
    dispatch(listRecitersReset());

    dispatch(listReciters("", true));

    return () => {
      dispatch(listRecitersReset());
    };
  }, [dispatch]);

  return (
    <section className=" px-5 max-w-screen-2xl mx-auto py-5 my-7 text-gray-900">
      <HeadingSection nameSection={"listeningNow"} />
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorAlert error={error} />
      ) : (
        <Slider {...settings} className="text-gray-900 dark:text-white">
          {reciters &&
            reciters.map((reciter, i) => (
              <Link
                to={`/completed-reciters/${reciter.slug}`}
                key={i}
                className="flex justify-center items-center h-full p-1 "
              >
                <div
                  className="card transform transition-transform hover:-translate-y-1 duration-300"
                  title={currentLang == "en" ? reciter.name : reciter.name_ar}
                >
                  <div className="w-full px-2 max-w-[250px] h-[160px] ">
                    <div className="flex justify-end px-1 pt-4"></div>
                    <div className="flex flex-col items-center pb-4">
                      <img
                        className="h-[100px] w-[100px] rounded-full object-fill"
                        src={reciter.photo}
                        alt="Bonnie image"
                      />
                      <h5 className="mt-1 text-center text-lg line-clamp-1 font-medium ">
                        {currentLang == "en" ? reciter.name : reciter.name_ar}
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      )}
    </section>
  );
}
