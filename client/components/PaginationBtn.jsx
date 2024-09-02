"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PaginationBtn({
  conditionClick,
  conditionDisabled,
  text,
  totalPages,
  isActive,
  isPrevious,
  isNext,
}) {
  const pathName = usePathname();
  const router = useRouter();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("currentPage", page);

      router.push(`${pathName}?${searchParams.toString()}`);
    }
  };

  let baseClasses =
    "flex items-center font-medium justify-center px-4 leading-tight border text-lg sm:text-xl py-2";
  let activeClasses =
    "text-blue-600 bg-blue-50 font-english hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
  let normalClasses =
    "text-gray-500 bg-white font-english hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white";
  let previousNextClasses = "rounded-s-lg font-arabic rounded-e-lg border-e-0";

  return (
    <button
      type="button"
      className={`${baseClasses} ${isActive ? activeClasses : normalClasses} ${
        isPrevious ? previousNextClasses : ""
      } ${isNext ? previousNextClasses : ""} ${
        conditionDisabled && "cursor-not-allowed"
      }`}
      onClick={() => handlePageChange(conditionClick)}
      disabled={conditionDisabled}
    >
      {text}
    </button>
  );
}
