"use client";

import { useState, useEffect } from "react";
import getName from "@/helpers/getNameForCurrentLang";
import { useTranslations } from "next-intl";

type DownloadCount = {
  arabicName: string;
  englishName: string;
  slug: string;
  totalDownloads: number;
};

export default function StatisticsTable({ locale }: LocaleProps) {
  const [items, setItems] = useState<DownloadCount[]>([]);
  const t = useTranslations("Statistics");

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      try {
        const response = await fetch("/api/downloads", {
          next: { revalidate: 0 },
        });

        if (response.ok) {
          const { data } = await response.json();
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching download counts:", error);
      }
    };

    fetchDownloadCounts();
  }, []);

  return (
    <div>
      <table className="w-full text-left text-gray-500 border text-md md:text-xl rtl:text-right border-slate-300 dark:border-gray-600 dark:text-gray-400">
        <thead className="text-gray-700 text-md bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b border-slate-300 dark:border-gray-600">
            <th className="p-2 sm:px-6 sm:py-3">{t("quranName")}</th>
            <th className="p-2 sm:px-6 sm:py-3">{t("totalDownloads")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr
                key={item.slug}
                className="border-b group border-slate-300 dark:border-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
              >
                <th className="flex items-center p-2 capitalize cursor-default sm:px-6 sm:py-3 gap-7 group-hover:underline group-hover:text-blue-500 dark:group-hover:text-slate-50">
                  <span>{getName(item, locale)}</span>
                </th>

                <td className="p-2 sm:px-6 sm:py-3 font-english">
                  {item.totalDownloads.toLocaleString() || 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
