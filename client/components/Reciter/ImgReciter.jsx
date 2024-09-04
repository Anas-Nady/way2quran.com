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
  const sizeClass = isSmaller
    ? "w-[150px] h-[150px] sm:w-[170px] sm:h-[170px]"
    : isBigger
    ? "w-[200px] h-[200px] sm:w-[220px] sm:h-[220px]"
    : "w-[200px] h-[200px]";

  const centeringClass = isCentering ? "mx-auto" : "";

  return (
    <>
      <Image
        src={photoDisplay}
        alt={alt}
        width="200"
        height="200"
        className={`${sizeClass} ${centeringClass} ${className}  rounded-full p-2 shadow-sm ${getObjectFitClass(
          photoDisplay
        )} ${className}`}
        priority
      />
    </>
  );
};

export default ImgReciter;
