import React, { useEffect } from "react";
import {
  ReciterCard,
  ErrorAlert,
  Pagination,
  Spinner,
  SearchInput,
  HeadingSection,
  NotFoundData,
  HelmetConfig,
} from "../components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listReciters } from "../redux/actions/reciterAction";
import { listRecitersReset } from "../redux/slices/reciterSlice";
import { useTranslation } from "react-i18next";

function Reciters() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading, reciters, pagination, error } = useSelector(
    (state) => state.listReciters
  );

  const recitationType = location.pathname.split("/")[1];

  useEffect(() => {
    dispatch(listRecitersReset());

    const url = new URLSearchParams(location.search);

    const keyword = url.get("keyword") || "";
    const pageNumber = url.get("pageNumber") || 1;

    dispatch(listReciters(recitationType, "", keyword, pageNumber));

    return () => {
      dispatch(listRecitersReset());
    };
  }, [dispatch, recitationType, location]);

  return (
    <>
      <HelmetConfig title={t("reciters")} />
      <div className="max-w-screen-2xl mx-auto border border-1 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 min-h-screen">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="ml-[600px] rtl:mr-[650px] rtl:ml-0">
            <HeadingSection nameSection={"reciters"} />
          </span>
          <form>
            <SearchInput />
          </form>
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorAlert error={error} />
        ) : reciters && reciters.length == 0 ? (
          <NotFoundData />
        ) : (
          <>
            <section className="flex justify-center gap-2 flex-wrap my-6 min-h-screen">
              {reciters?.map((reciter, i) => {
                return (
                  <ReciterCard
                    key={i}
                    slug={reciter.slug}
                    name={reciter.name}
                    name_ar={reciter.name_ar}
                    photo={reciter.photo}
                    recitations={reciter.recitations}
                  />
                );
              })}
            </section>
            <Pagination
              currentPage={pagination?.page || 0}
              totalPages={pagination?.pages || 0}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Reciters;
