"use client";
import { useTranslations } from "next-intl";
import PaginationBtn from "./PaginationBtn";
import { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages }) => {
  const t = useTranslations();
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
  const pageRange =
    endPage >= startPage
      ? [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i)
      : [];

  if (totalPages > 1) {
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex h-10 -space-x-px text-base">
          <li className="hidden sm:block">
            <PaginationBtn
              conditionClick={currentPage - 1}
              conditionDisabled={currentPage === 1}
              totalPages={totalPages}
              text={t("previous")}
              isPrevious={true}
            />
          </li>
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
          <li className="hidden sm:block">
            <PaginationBtn
              conditionClick={currentPage + 1}
              conditionDisabled={currentPage === totalPages}
              totalPages={totalPages}
              text={t("next")}
              isNext={true}
            />
          </li>
        </ul>
      </nav>
    );
  } else {
    return <></>;
  }
};

export default Pagination;
