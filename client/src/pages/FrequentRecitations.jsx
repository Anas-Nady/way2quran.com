import React, { useEffect } from "react";
import {
  Recitation,
  Spinner,
  ErrorAlert,
  NotFoundData,
  HelmetConfig,
  HeadingSection,
  Layout,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { listFrequentRecitations } from "../redux/actions/frequentRecitationsAction.js";
import { listFrequentRecitationsReset } from "./../redux/slices/frequentRecitationsSlice.js";
import { useTranslation } from "react-i18next";

function FrequentRecitations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading, error, recitations } = useSelector(
    (state) => state.listFrequentRecitations
  );

  useEffect(() => {
    dispatch(listFrequentRecitations());
    return () => {
      dispatch(listFrequentRecitationsReset());
    };
  }, [dispatch]);

  return (
    <>
      <HelmetConfig title={t("frequentRecitations")} />
      <Layout>
        <div className="max-w-screen-xl mx-auto border border-1 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 min-h-[80vh]">
          <HeadingSection
            nameSection="frequentRecitations"
            isCentering={true}
          />
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorAlert error={error} />
          ) : recitations && recitations.length == 0 ? (
            <NotFoundData />
          ) : (
            <div className="cards flex flex-wrap gap-2 justify-center items-center">
              {recitations &&
                recitations.map((recitation, i) => (
                  <Recitation key={i} data={recitation} />
                ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default FrequentRecitations;
