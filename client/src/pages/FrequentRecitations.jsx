import React, { useEffect } from "react";
import { Recitation, Spinner, ErrorAlert } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { listFrequentRecitations } from "../redux/actions/FrequentRecitationsAction";
import { listFrequentRecitationsReset } from "../redux/slices/FrequentRecitationsSlice";

function FrequentRecitations() {
  const dispatch = useDispatch();
  const { loading, error, recitations } = useSelector(
    (state) => state.frequentRecitations
  );

  useEffect(() => {
    dispatch(listFrequentRecitations());
    if (error) {
      dispatch(listFrequentRecitationsReset());
    }
  }, [dispatch]);

  return (
    <div className="max-w-screen-xl mx-auto border border-1 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 min-h-[76vh]">
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
  );
}

export default FrequentRecitations;
