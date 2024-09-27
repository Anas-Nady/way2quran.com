"use client";
import { PaginationDetails } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Pagination: React.FC<PaginationDetails> = ({
  currentPage,
  totalPages,
}) => {
  const [pageLimit, setPageLimit] = useState(5);

  // Function to update the pageLimit based on screen width
  const updatePageLimit = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      // xl screens
      setPageLimit(12);
    } else if (width >= 1024) {
      // lg screens
      setPageLimit(10);
    } else if (width >= 640) {
      // md screens
      setPageLimit(8);
    } else {
      // sm screens and below
      setPageLimit(5);
    }
  };

  // Set the initial pageLimit and add a resize event listener
  useEffect(() => {
    updatePageLimit();
    window.addEventListener("resize", updatePageLimit);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updatePageLimit);
  }, []);

  // Calculate the start and end of the visible page range
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  // Ensure the page range is valid
  const pageRange: number[] =
    endPage >= startPage
      ? Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
      : [];

  if (totalPages > 1) {
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex h-10 -space-x-px text-base">
          {pageRange.map((page) => (
            <li key={page}>
              <PaginationBtn
                conditionClick={page}
                conditionDisabled={false}
                totalPages={totalPages}
                text={page}
                isActive={currentPage === page}
              />
            </li>
          ))}
        </ul>
      </nav>
    );
  } else {
    return <></>;
  }
};

interface PaginationBtnProps {
  conditionClick: number;
  conditionDisabled: boolean;
  text: string | number;
  totalPages: number;
  isActive?: boolean;
  isPrevious?: boolean;
  isNext?: boolean;
}

const PaginationBtn: React.FC<PaginationBtnProps> = ({
  conditionClick,
  conditionDisabled,
  text,
  totalPages,
  isActive = false,
  isPrevious = false,
  isNext = false,
}) => {
  const pathName = usePathname();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("currentPage", page.toString());

      router.push(`${pathName}?${searchParams.toString()}`);
    }
  };

  const baseClasses =
    "flex items-center font-medium justify-center px-4 leading-tight border text-lg sm:text-xl py-2";
  const activeClasses =
    "text-blue-600 bg-blue-50 font-english hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
  const normalClasses =
    "text-gray-500 bg-white font-english hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white";
  const previousNextClasses =
    "rounded-s-lg font-arabic rounded-e-lg border-e-0";

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
};

export default Pagination;
