import { useTranslations } from "next-intl";
import PaginationBtn from "./PaginationBtn";

const Pagination = ({ currentPage, totalPages }) => {
  const t = useTranslations();

  if (totalPages > 1) {
    return (
      <div className="flex items-center justify-center py-2 mt-4 text-gray-900 bg-white border border-gray-200 dark:border-gray-700 dark:text-slate-50 dark:bg-gray-800">
        <PaginationBtn
          conditionClick={currentPage - 1}
          conditionDisabled={currentPage === 1}
          totalPages={totalPages}
          text={"<"}
        />
        <span className="mx-2 font-medium text-mg sm:text-lg lg:text-xl">
          {t("page")} <span className="font-english">{currentPage}</span>{" "}
          {t("of")} <span className="font-english">{totalPages}</span>
        </span>

        <PaginationBtn
          conditionClick={currentPage + 1}
          conditionDisabled={currentPage === totalPages}
          totalPages={totalPages}
          text={">"}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Pagination;
