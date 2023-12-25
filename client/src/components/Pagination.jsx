import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages }) => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("pageNumber", page);

      navigateTo(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 text-gray-900 dark:text-slate-50 bg-slate-50 dark:bg-gray-900">
      <button
        className="mx-1 px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <span className="mx-2">
        {t("page")} {currentPage} {t("of")} {totalPages}
      </span>
      <button
        className="mx-1 px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
