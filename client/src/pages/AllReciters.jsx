import React, { useEffect, useState } from "react";
import {
  Pagination,
  Table,
  Spinner,
  ErrorAlert,
  SearchInput,
  Select,
  TopReciterCheckBox,
} from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { listReciters } from "../redux/actions/reciterAction";
import {
  deleteReciterReset,
  listRecitersReset,
} from "../redux/slices/reciterSlice";

const AllReciters = () => {
  const navigateTo = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [recitationType, setRecitationType] = useState("");

  const [topReciters, setTopReciters] = useState(false);

  const { loading, reciters, pagination, error } = useSelector(
    (state) => state.listReciters
  );

  const options = [
    { slug: "", label: "allReciters" },
    { slug: "completed-recitations", label: "completedRecitations" },
    { slug: "various-recitations", label: "variousRecitations" },
  ];

  const handleSelectChange = (e) => {
    const searchParams = new URLSearchParams(location.search);
    setRecitationType(e.target.value);
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

    return () => {
      dispatch(listRecitersReset());
    };
  }, [location, dispatch, successDeletedReciter]);

  return (
    <div className="content ">
      <form className="flex flex-col justify-between items-start flex-wrap gap-2">
        <SearchInput />
        <Select
          onChange={handleSelectChange}
          options={options}
          value={recitationType}
          placeholder="chooseTypeOfRecitation"
        />
        <TopReciterCheckBox
          checked={topReciters}
          handleTopReciters={handleTopReciters}
        />
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
        isAdmin={true}
      />
    </div>
  );
};

export default AllReciters;
