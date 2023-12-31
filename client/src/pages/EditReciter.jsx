import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  ErrorAlert,
  Input,
  NotFoundData,
  Spinner,
} from "./../components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getReciterProfile,
  updateReciter,
} from "../redux/actions/reciterAction";
import {
  deleteReciterRecitationReset,
  deleteReciterSurahReset,
  getReciterProfileReset,
  updateReciterReset,
} from "../redux/slices/reciterSlice";

const EditReciter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { reciterSlug } = useParams();
  const {
    loading: loadingGetReciter,
    reciterInfo,
    recitationsInfo,
    success: successGetReciter,
    error: errorGetReciter,
  } = useSelector((state) => state.getReciterProfile);
  const {
    loading: loadingUpdateReciter,
    updatedReciter,
    success: successUpdateReciter,
    error: errorUpdateReciter,
  } = useSelector((state) => state.updateReciter);

  const [name, setName] = useState("");
  const [name_ar, setNameAR] = useState("");
  const [photo, setPhoto] = useState(null);
  const [topReciter, setTopReciter] = useState(false);
  const [photoDisplay, setPhotoDisplay] = useState("");

  const { success: successDeleteRecitation, error: errorDeleteRecitation } =
    useSelector((state) => state.deleteReciterRecitation);
  const { success: successDeleteSurah, error: errorDeleteSurah } = useSelector(
    (state) => state.deleteReciterSurah
  );

  const handleFileChange = (e) => {
    const selectedImg = e.target.files[0];
    setPhoto(selectedImg);
    setPhotoDisplay(URL.createObjectURL(selectedImg));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("name_ar", name_ar);
    if (photo) {
      formData.append("photo", photo);
    }
    formData.append("topReciter", topReciter);

    await dispatch(updateReciter(reciterSlug, formData));
  };

  useEffect(() => {
    // Reset the form state when a new reciter is selected
    setName(reciterInfo?.name || "");
    setNameAR(reciterInfo?.name_ar || "");
    setPhotoDisplay(reciterInfo?.photo || "");
    setTopReciter(reciterInfo?.topReciter || false);
  }, [reciterInfo]);

  useEffect(() => {
    dispatch(getReciterProfile(reciterSlug));

    if (successDeleteRecitation) {
      toast.success(t("successDeleteRecitation"));
    } else if (errorDeleteRecitation) {
      toast.error(errorDeleteRecitation);
    }

    if (successDeleteSurah) {
      toast.success(t("successDeleteSurah"));
    } else if (errorDeleteSurah) {
      toast.error(errorDeleteSurah);
    }
    dispatch(deleteReciterRecitationReset());

    dispatch(deleteReciterSurahReset());

    return () => {
      // Cleanup function to reset the state when the component is unmounted
      dispatch(getReciterProfileReset());
      dispatch(updateReciterReset());
    };
  }, [dispatch, reciterSlug, successDeleteRecitation, successDeleteSurah]);

  useEffect(() => {
    if (successUpdateReciter) {
      toast.success(t("successUpdatedReciter"));
      navigateTo(`/dashboard/preview-reciter/${updatedReciter.slug}`);
    } else if (errorUpdateReciter) {
      toast.error(error);
      dispatch(updateReciterReset());
    }
  }, [successUpdateReciter, errorUpdateReciter, dispatch, navigateTo, t]);

  return (
    <div className="flex justify-between items-start gap-4 flex-wrap px-4">
      {loadingGetReciter && <Spinner />}
      {errorGetReciter && <ErrorAlert error={errorGetReciter} />}
      {!loadingGetReciter && successGetReciter && (
        <>
          <div className="border border-slate-300 dark:border-gray-700 sm:w-[500px] mx-3 p-10">
            {photoDisplay && (
              <span className="flex justify-center">
                <img
                  src={photoDisplay}
                  alt="default img"
                  className="rounded-lg sm:w-[200px] h-[150px] object-fill"
                />
              </span>
            )}
            <form className="my-5">
              <Input
                label="arName"
                type="text"
                name="name_ar"
                placeholder={t("arName")}
                value={name_ar}
                onChange={(e) => setNameAR(e.target.value)}
              />
              <Input
                label="enName"
                type="text"
                name="name"
                value={name}
                placeholder={t("enName")}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                onChange={handleFileChange}
                label="photo"
                type="file"
                name="photo"
              />
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={topReciter}
                  onChange={() => setTopReciter(!topReciter)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {t("topReciters")}
                </label>
              </div>

              <Button
                text="save"
                handleSubmit={handleSubmit}
                disabled={loadingUpdateReciter}
              />
            </form>
          </div>
          <div className="recitations">
            {!loadingGetReciter &&
            recitationsInfo &&
            recitationsInfo.length === 0 ? (
              <NotFoundData />
            ) : (
              recitationsInfo.length > 0 &&
              recitationsInfo.map((recitation, i) => (
                <Accordion
                  recitation={recitation}
                  key={i}
                  i={i}
                  isEditReciterPage={true}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EditReciter;
