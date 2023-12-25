import React from "react";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/imgs/not-found.svg";
import { useTranslation } from "react-i18next";
import { wrongIcon } from "../components/Icons";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="min-h-[70vh] max-w-[900px] flex justify-center items-center flex-col gap-4 mx-auto">
        <img src={img} alt="Not Found" className=" px-8" />
        <h3 className="flex text-lg items-center justify-between text-red-600">
          <span>{wrongIcon}</span>
          <span>{t("notFoundPage")}</span>
        </h3>
        <Link
          to="/"
          className="bg-orange-600  font-semibold text-white p-2 rounded hover:bg-orange-700 duration-100"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
