import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  checkedIcon,
  closeIcon,
  deleteReciterIcon,
  editReciterIcon,
  viewReciterIcon,
} from "@/components/Icons";
import getName from "@/helpers/getNameForCurrentLang";

type TableProps = LocaleProps & {
  reciters: ReciterProfile[];
  loading: boolean;
  handleDeleteReciter: (slug: string) => Promise<void>;
};

const Table: React.FC<TableProps> = ({
  reciters,
  locale,
  loading,
  handleDeleteReciter,
}) => {
  const router = useRouter();
  const t = useTranslations("AllRecitersPage");

  return (
    <table className="w-full text-left text-gray-500 border text-md md:text-xl rtl:text-right border-slate-300 dark:border-gray-600 dark:text-gray-400">
      <thead className="text-gray-700 text-md bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="border-b border-slate-300 dark:border-gray-600">
          <th className="p-2 sm:px-6 sm:py-3">{t("reciterName")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("totalViewers")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("topReciters")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("recitationsNumber")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("createdAt")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        {reciters.map((reciter) => (
          <tr
            key={reciter.slug}
            className="border-b group border-slate-300 dark:border-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
          >
            <th
              onClick={() =>
                router.push(
                  `/${locale}/dashboard/preview-reciter/${reciter.slug}`
                )
              }
              className="flex items-center p-2 capitalize cursor-pointer sm:px-6 sm:py-3 gap-7 group-hover:underline group-hover:text-blue-500 dark:group-hover:text-slate-50"
            >
              <span className="grid w-5 h-5 mb-2 text-center text-gray-900 rounded-sm font-english dark:text-white place-items-center">
                {reciter.number}
              </span>
              <span>{getName(reciter, locale)}</span>
            </th>

            <td className="p-2 sm:px-6 sm:py-3 font-english">
              {reciter.totalViewers?.toLocaleString()}
            </td>

            <td
              className={`p-2 sm:px-6 sm:py-3 font-bold ${
                reciter.isTopReciter
                  ? "text-gray-900 dark:text-green-500"
                  : "text-gray-900 dark:text-red-500"
              }`}
            >
              {reciter.isTopReciter ? checkedIcon : closeIcon}
            </td>

            <td className="p-2 sm:px-6 sm:py-3 font-english">
              {reciter.totalRecitations}
            </td>

            <td className="p-2 sm:px-6 sm:py-3 font-english">
              {reciter?.createdAt?.substring(0, 10)}
            </td>

            <td className="flex gap-1 p-2 cursor-pointer sm:px-6 sm:py-3">
              <Link
                className="cursor-pointer hover:text-gray-900 dark:hover:text-slate-50"
                title="view"
                href={`/${locale}/dashboard/preview-reciter/${reciter.slug}`}
              >
                {viewReciterIcon}
              </Link>
              <Link
                className="cursor-pointer hover:text-blue-600"
                title="edit"
                href={`/${locale}/dashboard/edit-reciter/${reciter.slug}`}
              >
                {editReciterIcon}
              </Link>
              <button
                title="delete"
                onClick={() => handleDeleteReciter(reciter.slug)}
                className={`hover:text-red-500 ${
                  loading && "opacity-40 cursor-not-allowed"
                }`}
              >
                {deleteReciterIcon}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
