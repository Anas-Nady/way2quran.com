"use client";

import { leftArrowIcon, rightArrowIcon } from "@/components/Icons";
import DashboardLinks from "./DashboardLinks";
import { useState } from "react";
import { LocaleProps } from "@/types/types";

export default function DashboardAsideBar({ locale }: LocaleProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <>
        <aside
          className={`sidebar relative dark:bg-gray-800 border border-slate-300 dark:border-gray-600 bg-slate-100 min-h-screen p-5 ${
            isOpen ? "w-64" : "w-20"
          } duration-200`}
        >
          <span
            className={`absolute  ${
              locale == "en" ? "-right-3" : "-left-3"
            } top-5 p-1 rounded-full cursor-pointer rtl:rotate-180 bg-gray-200 border border-gray-700 dark:border-slate-100 dark:bg-slate-900 text-gray-900 dark:text-slate-50 dark:border`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? leftArrowIcon : rightArrowIcon}
          </span>
          <DashboardLinks locale={locale} isOpen={isOpen} />
        </aside>
      </>
    </>
  );
}
