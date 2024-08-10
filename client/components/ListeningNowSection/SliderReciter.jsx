"use client";
import { usePathname } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Slider from "react-slick";
import { HAFS_AN_ASIM, VARIOUS_RECITATIONS } from "@/constants/recitationsName";
import getName from "@/utils/getNameForCurrentLang";
import ImgReciter from "../Reciter/ImgReciter";

export default function SliderReciter({ reciters, locale }) {
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 200,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider
      {...settings}
      dir={locale == "ar" ? "rtl" : "ltr"}
      className="py-5 mt-5 mb-10 text-gray-900 dark:text-white"
    >
      {reciters?.map((reciter) => {
        const reciterName = getName(reciter, currentLang);
        return (
          <Link
            href={`/${currentLang}/${VARIOUS_RECITATIONS}/${reciter.slug}?recitationSlug=${HAFS_AN_ASIM}`}
            key={reciter.slug}
            className="flex items-center justify-center h-full"
          >
            <div
              className="flex items-center justify-center transition-transform duration-300 transform card hover:-translate-y-1"
              title={reciterName}
            >
              <div className="w-full px-2 min-w-[250px] min-h-[160px] mx-1">
                <div className="flex flex-col items-center pb-4">
                  <ImgReciter
                    loading="lazy"
                    width="150"
                    height="150"
                    photoDisplay={reciter.photo}
                    alt={reciterName}
                    isSmaller
                  />
                  <h2
                    dir={locale == "ar" ? "rtl" : "ltr"}
                    className="mt-1 text-lg font-semibold text-center sm:text-xl line-clamp-1 "
                  >
                    {reciterName}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </Slider>
  );
}
