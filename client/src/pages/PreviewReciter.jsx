import React, { useEffect } from "react";
import { starIcon } from "../components/Icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReciterProfileReset } from "../redux/slices/reciterSlice";
import { useTranslation } from "react-i18next";
import { Accordion, ErrorAlert, NotFoundData, Spinner } from "../components";
import { getReciterProfile } from "../redux/actions/reciterAction";

const PreviewReciter = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const { loading, reciterInfo, recitationsInfo, error } = useSelector(
    (state) => state.getReciterProfile
  );

  const { reciterSlug } = useParams();

  useEffect(() => {
    dispatch(getReciterProfile(reciterSlug));
    console.log(reciterInfo);
    console.log(recitationsInfo);

    return () => {
      dispatch(getReciterProfileReset());
    };
  }, [dispatch, reciterSlug]);

  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorAlert error={error} />}
      {reciterInfo && (
        <div className="my-2 sm:my-5 flex flex-col sm:flex-row m-auto gap-4">
          <div className="img-reciter block mx-auto min-w-[200px] h-[150px] max-w-[120px] sm:max-w-[250px] sm:h-[185px]">
            <img
              src={reciterInfo.photo}
              alt="name"
              className="w-full h-full rounded-lg sm:rounded object-fill"
            />
          </div>
          <div className="info-reciter flex-col sm:flex-row gap-1 sm:flex-1 max-w-[100%] flex sm:justify-between">
            <div className="data-reciter flex items-center sm:items-start w-full mx-auto mt-[-10px] sm:my-8 flex-col">
              <h1 className="text-sm sm:text-lg my-1 sm:my-3 capitalize lg:text-xl xl:text-2xl text-gray-900 dark:text-white font-semibold">
                {currentLang == "en" ? reciterInfo?.name : reciterInfo.name_ar}
              </h1>

              <div className="text-gray-900 dark:text-slate-50 font-semibold flex gap-1 items-center">
                {reciterInfo?.topReciter && (
                  <>
                    <span className="text-yellow-300">{starIcon}</span>
                    <span className="text-sm">{t("topReciters")}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="recitations">
        <h2 className="text-2xl my-3 border-2 border-slate-300 dark:border-gray-600 w-fit px-3 py-2">
          {t("recitations")}
        </h2>
        {!loading && recitationsInfo && recitationsInfo.length == 0 ? (
          <NotFoundData />
        ) : (
          recitationsInfo.length > 0 &&
          recitationsInfo.map((recitation, i) => (
            <Accordion recitation={recitation} key={i} i={i} />
          ))
        )}
      </div>
    </div>
  );
};
export default PreviewReciter;
