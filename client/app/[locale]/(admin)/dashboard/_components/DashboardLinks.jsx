"use client";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLinks = ({ dashboardLinks, isOpen, currentLang, logoutTxt }) => {
  const pathName = usePathname();
  const [messagesCount, setMessagesCount] = useState(0);

  const fetchUnreadMessages = async () => {
    try {
      const res = await fetch("/api/messages/unread");

      if (res.ok) {
        const data = await res.json();
        setMessagesCount(data?.messagesCount);
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
      {dashboardLinks.map((link, i) => {
        return (
          <Link
            href={`/${currentLang}/dashboard/${link.url}`}
            key={i}
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

      <LogoutBtn isOpen={isOpen} logoutTxt={logoutTxt} />
    </ul>
  );
};

export default DashboardLinks;
