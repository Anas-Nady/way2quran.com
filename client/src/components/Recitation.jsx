import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import getTextTranslation from "../utils/getTextTranslation";

function Recitation({ data }) {
  const { i18n } = useTranslation();

  // disappear Hafs An Asim recitation
  if (data.slug == "hafs-an-asim") {
    return null;
  }

  return (
    <Link
      to={data.slug}
      className="flex justify-center items-center relative p-2  min-w-[340px] max-w-[400px] sm:min-w-[400px] min-h-[80px] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      title={getTextTranslation(i18n.language, data.name, data.name_ar)}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <h2 className=" text-md sm:text-lg font-normal dark:font-semibold text-gray-900 dark:text-white">
          {getTextTranslation(i18n.language, data.name, data.name_ar)}
        </h2>
      </div>
    </Link>
  );
}

export default Recitation;
