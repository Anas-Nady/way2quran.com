"use client";

import listQuranPdf from "@/constants/listQuranPdf";
import getName from "@/utils/getNameForCurrentLang";

export default function StatisticsTable({
  currentLang,
  quranNameTxt,
  totalDownloadsTxt,
  downloadsCount,
}) {
  return (
    <div>
      <table className="w-full text-left text-gray-500 border text-md md:text-xl rtl:text-right border-slate-300 dark:border-gray-600 dark:text-gray-400">
        <thead className="text-gray-700 text-md bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b border-slate-300 dark:border-gray-600">
            <th className="p-2 sm:px-6 sm:py-3">{quranNameTxt}</th>
            <th className="p-2 sm:px-6 sm:py-3">{totalDownloadsTxt}</th>
          </tr>
        </thead>
        <tbody>
          {listQuranPdf.map((quranPdf) => {
            const downloadCounts = downloadsCount.find(
              (count) => count._id === quranPdf.slug
            );
            return (
              <tr
                key={quranPdf.slug}
                className="border-b group border-slate-300 dark:border-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
              >
                <th className="flex items-center p-2 capitalize cursor-pointer sm:px-6 sm:py-3 gap-7 group-hover:underline group-hover:text-blue-500 dark:group-hover:text-slate-50">
                  <span>{getName(quranPdf, currentLang)}</span>
                </th>

                <td className="p-2 sm:px-6 sm:py-3 font-english">
                  {downloadCounts?.count?.toLocaleString() || 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
