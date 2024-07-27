"use client";
import { HAFS_AN_ASIM } from "@/constants/recitationsName";
import getName from "@/utils/getNameForCurrentLang";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Recitation({ data }) {
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];

  // disappear Hafs An Asim recitation
  if (data.slug == HAFS_AN_ASIM) {
    return null;
  }

  const getNameTranslation = getName(data, currentLang);

  return (
    <Link
      href={`${pathName}/${data.slug}`}
      className="flex justify-center items-center relative p-2  min-w-[340px] max-w-[400px] sm:min-w-[400px] min-h-[80px] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      title={getNameTranslation}
    >
      <div className="overflow-hidden whitespace-nowrap text-ellipsis">
        <h2 className="font-medium text-gray-900 text-md sm:text-lg dark:font-semibold dark:text-white">
          {getNameTranslation}
        </h2>
      </div>
    </Link>
  );
}
