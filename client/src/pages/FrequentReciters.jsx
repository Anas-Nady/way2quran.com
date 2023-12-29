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
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listReciters } from "../redux/actions/reciterAction";
import { listRecitersReset } from "../redux/slices/reciterSlice";
import { useTranslation } from "react-i18next";

function FrequentReciters() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { recitationSlug } = useParams();
  const { loading, reciters, recitation, pagination, error } = useSelector(
    (state) => state.listReciters
  );
  const titlePage =
    i18n.language == "en"
      ? recitation?.name
      : recitation?.name_ar || location.host;

  useEffect(() => {
    const url = new URLSearchParams(location.search);

    const keyword = url.get("keyword") || "";
    const pageNumber = url.get("pageNumber") || 1;

    dispatch(listReciters(recitationSlug, "", keyword, pageNumber));
    console.log(recitation);

    return () => {
      dispatch(listRecitersReset());
    };
  }, [dispatch, recitationSlug]);

  return (
    <>
      <HelmetConfig title={titlePage} />
      <div className="max-w-screen-xl mx-auto border border-1 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 min-h-screen">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <HeadingSection name={titlePage} />
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
          reciters &&
          reciters.length > 0 && (
            <>
              <section className=" min-h-[80vh] my-6">
                <div className="flex justify-center items-center gap-2 flex-wrap ">
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
                </div>
              </section>
              <Pagination
                currentPage={pagination?.page || 0}
                totalPages={pagination?.pages || 0}
              />
            </>
          )
        )}
      </div>
    </>
  );
}

export default FrequentReciters;
