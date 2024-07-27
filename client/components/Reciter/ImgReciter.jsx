import getObjectFitClass from "@/utils/getObjectFitClass";
import Image from "next/image";

const ImgReciter = ({
  photoDisplay,
  alt = "Way2quran",
  className = "",
  isBigger = false,
  isSmaller = false,
  isCentering = false,
}) => {
  return (
    <>
      <Image
        src={photoDisplay}
        alt={alt}
        width="200"
        height="200"
        className={`${
          isSmaller
            ? "h-[100px] w-[100px]"
            : isBigger
            ? "w-[200px] h-[200px] sm:w-[220px]  sm:h-[220px]"
            : "w-[170px] h-[170px]"
        }  rounded-full p-2 shadow-sm ${getObjectFitClass(photoDisplay)} ${
          isCentering ? "mx-auto" : ""
        } ${className}`}
      />
    </>
  );
};

export default ImgReciter;
