import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Recitation({ data }) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const name = currentLanguage === "en" ? data.name : data.name_ar;

  return (
    <Link
      to={data.slug}
      className="flex justify-center items-center relative p-2  min-w-[340px] max-w-[400px] sm:min-w-[400px] min-h-[80px] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      title={name}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <h5 className=" text-md sm:text-lg font-normal dark:font-semibold text-gray-900 dark:text-white">
          {name}
        </h5>
      </div>
    </Link>
  );
}

export default Recitation;
