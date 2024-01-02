import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { leftArrow, rightArrow } from "../components/Icons";
import { useTranslation } from "react-i18next";
import { DashboardLinks, Spinner } from "../components";
import { useDispatch, useSelector } from "react-redux";
import PermissionError from "./PermissionError";
import { getUserProfile } from "../redux/actions/userAction";
import { Helmet } from "react-helmet";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLang = i18n.language;

  const { loading, success, error } = useSelector(
    (state) => state.getUserProfile
  );
  const isAdmin = JSON.parse(sessionStorage.getItem("user"))?.isAdmin;

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="dark:bg-gray-900 bg-slate-50 min-h-screen flex">
        {isAdmin && success ? (
          <>
            <aside
              className={`sidebar relative dark:bg-gray-800  bg-slate-100 min-h-screen p-5 ${
                isOpen ? "w-64" : "w-20"
              } duration-200`}
            >
              <span
                className={`absolute  ${
                  currentLang == "en" ? "-right-3" : "-left-3"
                } top-5 p-1 rounded-full cursor-pointer rtl:rotate-180 bg-gray-200 border border-gray-700 dark:border-slate-100 dark:bg-slate-900 text-gray-900 dark:text-slate-50 dark:border`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? leftArrow : rightArrow}
              </span>
              <DashboardLinks isOpen={isOpen} />
            </aside>
            <div className="container  p-6 dark:bg-gray-800 text-gray-900  dark:text-slate-300 bg-slate-100">
              <Outlet />
            </div>
          </>
        ) : loading ? (
          <Spinner />
        ) : (
          <PermissionError />
        )}
      </div>
    </>
  );
}

export default Dashboard;
