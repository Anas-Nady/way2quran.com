import React from "react";

const ImgReciter = ({
  photoDisplay,
  alt = "way2quran logo",
  className = "",
  isBigger = false,
}) => {
  return (
    <>
      <img
        src={photoDisplay}
        alt={alt}
        className={`w-[150px] h-[150px] ${
          isBigger && "sm:w-[200px]  sm:h-[200px]"
        }  rounded-full p-2 shadow-lg object-fill ${className}`}
      />
    </>
  );
};

export default ImgReciter;
