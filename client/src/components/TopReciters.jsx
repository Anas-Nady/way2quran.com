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
    dispatch(listReciters("", true));
    if (error) {
      dispatch(listRecitersReset());
    }
  }, [dispatch, error]);

  return (
    <section className="container px-5 max-w-screen-xl py-5 my-7">
      <HeadingSection nameSection={"mostListening"} />
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorAlert error={error} />
      ) : (
        <Slider {...settings}>
          {reciters &&
            reciters.map((reciter, i) => (
              <Link
                to={`/completed-reciters/${reciter.slug}`}
                key={i}
                className="flex justify-center items-center h-full p-1"
              >
                <div className="card transform transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-full px-2 max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-end px-1 pt-4"></div>
                    <div className="flex flex-col items-center pb-4">
                      <span className="w-[60px]">
                        <img
                          className="w-full mb-3 rounded-full shadow-lg object-cover"
                          src={reciter.photo}
                          alt="Bonnie image"
                        />
                      </span>
                      <h5 className="mb-1 text-center text-xl font-medium text-gray-900 dark:text-white">
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
