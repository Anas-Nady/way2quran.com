import getObjectFitClass from "@/helpers/getObjectFitClass";
import Image from "next/image";

interface ReciterImgProps {
  src: string;
  alt?: string;
  className?: string;
  isSmaller?: boolean;
  isCentering?: boolean;
}

const ReciterImg: React.FC<ReciterImgProps> = ({
  src,
  alt = "Way2quran",
  className = "",
  isSmaller = false,
  isCentering = false,
}) => {
  const sizeClass = isSmaller ? "w-[200px] h-[200px]" : "w-[220px] h-[220px]";

  const centeringClass = isCentering ? "mx-auto" : "";

  return (
    <Image
      src={src}
      alt={alt}
      width="200"
      height="200"
      className={`${sizeClass} ${centeringClass} ${className} rounded-full p-2 shadow-sm ${getObjectFitClass(
        src
      )} ${className}`}
      priority
    />
  );
};

export default ReciterImg;
