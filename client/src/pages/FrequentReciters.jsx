import React, { useEffect } from "react";
import {
  ReciterCard,
  ErrorAlert,
  Pagination,
  Spinner,
  SearchInput,
  HeadingSection,
  NotFoundData,
} from "../components";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listReciters } from "../redux/actions/reciterAction";
import { listRecitersReset } from "../redux/slices/reciterSlice";

function FrequentReciters() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { recitationSlug } = useParams();
  const { loading, reciters, pagination, error } = useSelector(
    (state) => state.listReciters
  );

  useEffect(() => {
    const url = new URLSearchParams(location.search);

    const keyword = url.get("keyword") || "";
    const pageNumber = url.get("pageNumber") || 1;

    dispatch(listReciters(recitationSlug, "", keyword, pageNumber));

    if (error) {
      dispatch(listRecitersReset());
    }
  }, [dispatch, location, recitationSlug, error]);

  return (
    <div className="max-w-screen-xl mx-auto border border-1 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 min-h-screen">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <HeadingSection nameSection={"reciters"} />
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
          <section className="flex justify-center items-center gap-2 flex-wrap my-6">
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
  );
}

export default FrequentReciters;
