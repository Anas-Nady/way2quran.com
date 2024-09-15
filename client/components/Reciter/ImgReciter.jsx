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
  const sizeClass = isSmaller ? "w-[200px] h-[200px]" : "w-[220px] h-[220px]";

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
