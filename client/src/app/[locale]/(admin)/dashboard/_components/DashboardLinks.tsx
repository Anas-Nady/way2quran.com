"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { usePathname } from "next/navigation";
import DASHBOARD_LINKS from "@/constants/DashboardLinks";
import { getUnReadMessages } from "@/actions/messages";

type DashboardLinks = LocaleProps & {
  isOpen: boolean;
};

const DashboardLinks: React.FC<DashboardLinks> = ({ isOpen, locale }) => {
  const pathName = usePathname();
  const [messagesCount, setMessagesCount] = useState(0);

  const fetchUnreadMessages = async () => {
    try {
      const res = await getUnReadMessages();

      if (res.ok) {
        const data = await res.json();
        setMessagesCount(data.messagesCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();
  }, []);

  useEffect(() => {
    if (pathName.includes("messages")) {
      setMessagesCount(0);
    }
  }, [pathName]);

  return (
    <ul>
      {DASHBOARD_LINKS().map((link) => {
        return (
          <Link
            href={`/${locale}/dashboard/${link.url}`}
            key={link.name}
            title={link.name}
            className={`flex relative gap-2 text-xl text-gray-900 dark:text-slate-50 ${
              pathName.includes(link.url) &&
              "text-gray-900 dark:text-slate-50 bg-slate-200 dark:bg-gray-900"
            } hover:bg-slate-200 px-2 py-2 rounded duration-300 dark:hover:bg-gray-900`}
          >
            <span className={`${!isOpen && "rotate-[360deg]"} duration-500`}>
              {link.icon}
            </span>

            {isOpen && (
              <li className={`${!isOpen && "scale-0 "} duration-300 `}>
                {link.name}
              </li>
            )}
            {link.url === "messages" && messagesCount >= 1 && (
              <span className="absolute top-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full ltr:-left-1 rtl:-right-1 dark:border-gray-800"></span>
            )}
          </Link>
        );
      })}

      <LogoutBtn isOpen={isOpen} />
    </ul>
  );
};

export default DashboardLinks;
