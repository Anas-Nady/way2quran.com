import React, { useEffect, useState } from "react";
import {
  Pagination,
  Table,
  Spinner,
  ErrorAlert,
  SearchInput,
} from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { listReciters } from "../redux/actions/reciterAction";
import { toast } from "react-toastify";
import {
  deleteReciterReset,
  listRecitersReset,
} from "../redux/slices/reciterSlice";

const AllReciters = () => {
  const navigateTo = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const [topReciters, setTopReciters] = useState(false);

  const { loading, reciters, pagination, error } = useSelector(
    (state) => state.listReciters
  );

  const handleSelectChange = (e) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("recitationType", e.target.value);

    navigateTo(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleTopReciters = (e) => {
    e.preventDefault();
    const updatedTopReciters = !topReciters ? true : "";
    setTopReciters(updatedTopReciters);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("topReciters", updatedTopReciters);

    navigateTo(`${location.pathname}?${searchParams.toString()}`);
  };

  const { success: successDeletedReciter } = useSelector(
    (state) => state.deleteReciter
  );

  useEffect(() => {
    const url = new URLSearchParams(location.search);

    const recitationType = url.get("recitationType") || "";
    const topReciters = url.get("topReciters") || "";
    const keyword = url.get("keyword") || "";
    const pageNumber = url.get("pageNumber") || "";

    dispatch(listReciters(recitationType, topReciters, keyword, pageNumber));
    dispatch(deleteReciterReset());

    if (error) {
      toast.error("error");
      dispatch(listRecitersReset());
    }
  }, [location, dispatch, successDeletedReciter]);

  return (
    <div className="content ">
      <form className="flex flex-col justify-between items-start flex-wrap gap-2">
        <SearchInput />
        <select
          className="bg-gray-50 border  mb-2.5 h-fit p-3 w-[270px] border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleSelectChange}
        >
          <option disabled value="" className="dark:bg-gray-900  ">
            {t("chooseTypeOfRecitation")}
          </option>
          <option value="" className="dark:bg-gray-900  ">
            {t("allReciters")}
          </option>
          <option value="completed-recitations" className="dark:bg-gray-900  ">
            {t("completedRecitations")}
          </option>
          <option value="various-recitations" className="dark:bg-gray-900  ">
            {t("variousRecitations")}
          </option>
        </select>
        <button className="flex items-center mb-4" onClick={handleTopReciters}>
          <input
            id="default-checkbox"
            type="checkbox"
            checked={topReciters}
            onChange={() => {}}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {t("topReciters")}
          </label>
        </button>
      </form>

      <section>
        <div className="reciter relative shadow-md sm:rounded-lg min-h-screen">
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorAlert error={error} />
          ) : (
            reciters && <Table reciters={reciters} />
          )}
        </div>
      </section>
      <Pagination
        currentPage={pagination?.page || 0}
        totalPages={pagination?.pages || 0}
      />
    </div>
  );
};

export default AllReciters;
