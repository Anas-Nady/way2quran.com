"use client";
import Link from "next/link";
import ImgReciter from "./ImgReciter";
import { usePathname } from "next/navigation";
import getName from "@/utils/getNameForCurrentLang";

export default function ReciterCard({ reciter, recitationSlug }) {
  const { slug, photo } = reciter;
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];
  const reciterName = getName(reciter, currentLang);

  return (
    <Link
      href={`${pathName}/${slug}?recitationSlug=${recitationSlug}`}
      title={reciterName}
      className="h-fit"
    >
      <div className="transition-transform duration-300 transform card hover:-translate-y-1">
        <div className="w-full px-2 min-w-[250px] min-h-[236px] max-w-[300px] bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-1 pt-4"></div>
          <div className="flex flex-col items-center pb-5">
            <span className="mb-2 ">
              <ImgReciter photoDisplay={photo} alt={reciterName} />
            </span>
            <h2 className="my-1 text-center text-2xl line-clamp-1 max-w-[250px] capitalize font-semibold text-gray-900 dark:text-white">
              {reciterName}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
