import React, { useEffect } from "react";
import { checkedIcon, closeIcon, editIcon, eyeIcon, trashIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import { deleteReciter } from "../redux/actions/reciterAction";
import { useDispatch, useSelector } from "react-redux";
import { deleteReciterReset } from "../redux/slices/reciterSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Table = ({ reciters }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.deleteReciter
  );

  const handleDeleteReciter = async (slug) => {
    await dispatch(deleteReciter(slug));
  };

  useEffect(() => {
    if (success) {
      toast.success("deleted reciter successfully");
    } else if (error) toast.error(error);

    dispatch(deleteReciterReset());
  }, [dispatch, error, success]);

  return (
    <table className="w-full text-md text-left rtl:text-right  border border-slate-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
      <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="border-b border-slate-300 dark:border-gray-600">
          <th className="p-2 sm:px-6 sm:py-3">{t("reciterName")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("recitationsNumber")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("topReciters")}</th>
          <th className="p-2 sm:px-6 sm:py-3">{t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        {reciters &&
          reciters.map((reciter, i) => (
            <tr
              key={i}
              className="group border-b border-slate-300 dark:border-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
            >
              <th className="p-2 sm:px-6 sm:py-3 capitalize flex  gap-1 items-center cursor-pointer group-hover:underline group-hover:text-blue-500 dark:group-hover:text-slate-50">
                <span className="w-5 h-5 rounded-sm  text-gray-900 dark:text-white text-center grid place-items-center">
                  {reciter.number}
                </span>
                <span>
                  {currentLang == "en" ? reciter.name : reciter.name_ar}
                </span>
              </th>
              <td className="p-2 sm:px-6 sm:py-3 ">
                {reciter.recitations?.length}
              </td>
              <td
                className={`p-2 sm:px-6 sm:py-3 font-bold 
                text-${reciter.topReciter ? "blue" : "red"}-400 
                dark:text-${reciter.topReciter ? "yellow" : "red"}-400`}
              >
                {reciter.topReciter ? checkedIcon : closeIcon}
              </td>

              <td className="p-2 sm:px-6 sm:py-3 cursor-pointer flex gap-1">
                <Link
                  className="cursor-pointer hover:text-gray-900 dark:hover:text-slate-50"
                  title="view"
                  to={`/dashboard/preview-reciter/${reciter.slug}`}
                >
                  {eyeIcon}
                </Link>
                <Link
                  className="cursor-pointer hover:text-blue-600"
                  title="edit"
                  to={`/dashboard/edit-reciter/${reciter.slug}`}
                >
                  {editIcon}
                </Link>
                <button
                  className="cursor-pointer hover:text-red-600"
                  title="delete"
                  onClick={() => handleDeleteReciter(reciter.slug)}
                  disabled={loading}
                >
                  {trashIcon}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
