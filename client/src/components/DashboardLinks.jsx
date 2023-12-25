import React from "react";
import {
  settingsIcon,
  userIcon,
  usersIcon,
  audioIcon,
  logoutIcon,
  messagesIcon,
} from "./Icons";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const DashboardLinks = ({ isOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigateTo("/");
  };

  const dashboardLinks = [
    {
      name: t("addReciter"),

      icon: userIcon,
      url: "add-reciter",
    },
    {
      name: t("allReciters"),

      icon: usersIcon,
      url: "all-reciters",
    },
    {
      name: t("uploadRecitation"),

      icon: audioIcon,
      url: "upload-recitation",
    },
    {
      name: t("messages"),

      icon: messagesIcon,
      url: "messages",
    },
    {
      name: t("settings"),
      icon: settingsIcon,
      url: "profile",
    },
  ];

  return (
    <ul>
      {dashboardLinks.map((link, i) => {
        return (
          <Link
            to={`/dashboard/${link.url}`}
            key={i}
            className="flex gap-2 text-gray-900 dark:text-slate-50 hover:bg-slate-200 px-2 py-2 rounded duration-300 dark:hover:bg-gray-900"
          >
            <span className={`${!isOpen && "rotate-[360deg]"} duration-500`}>
              {link.icon}
            </span>

            {isOpen && (
              <li className={`${!isOpen && "scale-0 "} duration-300 `}>
                {link.name}
              </li>
            )}
          </Link>
        );
      })}

      <button
        onClick={handleLogout}
        className="flex w-full gap-2 text-gray-900  dark:text-slate-50 hover:bg-slate-200 px-2 py-2 rounded duration-300 dark:hover:bg-gray-900"
      >
        <span className={`${!isOpen && "rotate-[360deg]"} duration-500`}>
          {logoutIcon}
        </span>

        {isOpen && (
          <li className={`${!isOpen && "scale-0"} duration-300 `}>
            {t("logout")}
          </li>
        )}
      </button>
    </ul>
  );
};

export default DashboardLinks;
