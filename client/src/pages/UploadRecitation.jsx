import React, { useEffect, useState } from "react";
import { Button, Input, Spinner } from "../components";
import { trashIcon } from "../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { listFrequentRecitations } from "../redux/actions/FrequentRecitationsAction";
import { listFrequentRecitationsReset } from "../redux/slices/FrequentRecitationsSlice";
import { listReciters, uploadRecitation } from "../redux/actions/reciterAction";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { uploadRecitationReset } from "../redux/slices/reciterSlice";

const UploadRecitation = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [reciterSlug, setReciterSlug] = useState("");
  const [recitationSlug, setRecitationSlug] = useState("");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setAudioFiles(files);

    // Array.from(files).forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onload = (event) => {
    //     console.log(`File ${file.name} uploaded successfully.`);
    //     // You can perform additional actions here if needed
    //     setFileNames((prevFileNames) => [...prevFileNames, file.name]);
    //   };

    //   // Read the file as a data URL
    //   reader.readAsDataURL(file);
    // });
  };

  const { loading, recitations } = useSelector(
    (state) => state.listFrequentRecitations
  );
  const { loading: loadingReciters, reciters } = useSelector(
    (state) => state.listReciters
  );
  const {
    loading: loadingUploadRecitation,
    success: successUpload,
    error: errorUploading,
  } = useSelector((state) => state.uploadRecitation);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(uploadRecitation(recitationSlug, reciterSlug, audioFiles));
  };

  useEffect(() => {
    dispatch(listFrequentRecitations());
    dispatch(listReciters());

    if (errorUploading) {
      toast.error(errorUploading);
    }
    if (successUpload) {
      toast.success("uploaded recitation successfully");
    }
    dispatch(uploadRecitationReset());
  }, [successUpload, errorUploading]);

  return (
    <div className=" flex justify-center items-center">
      <form>
        <div className="flex justify-start gap-2 flex-col items-start">
          <div className="flex gap-2">
            {loading && <Spinner />}
            <select
              value={recitationSlug}
              onChange={(e) => setRecitationSlug(e.target.value)}
              className="bg-gray-50 border  mb-2.5 h-fit p-3 w-[235px] border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected value="" className="dark:bg-gray-900  ">
                {t("chooseRecitation")}
              </option>
              <option value="hafs-an-asim" className="dark:bg-gray-900  ">
                {t("hafsAnAsim")}
              </option>
              {recitations &&
                recitations.length > 0 &&
                recitations.map((recitation, i) => (
                  <option
                    value={recitation.slug}
                    className="dark:bg-gray-900"
                    key={i}
                  >
                    {currentLang == "en" ? recitation.name : recitation.name_ar}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-2">
            {loadingReciters && <Spinner />}
            <select
              value={reciterSlug}
              onChange={(e) => setReciterSlug(e.target.value)}
              className="bg-gray-50 border  mb-2.5 h-fit p-3 w-[235px] border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected value="" className="dark:bg-gray-900  ">
                {t("chooseReciter")}
              </option>
              {reciters &&
                reciters.length > 0 &&
                reciters.map((reciter, i) => (
                  <option
                    value={reciter.slug}
                    className="dark:bg-gray-900"
                    key={i}
                  >
                    {currentLang == "en" ? reciter.name : reciter.name_ar}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <input
              type="file"
              multiple
              id="audioFiles"
              className="bg-gray-600 rounded-sm p-2 my-2 w-[235px]"
              name="audioFiles"
              required
              onChange={handleFileUpload}
              accept="audio/*"
            />
          </div>
        </div>

        <Button
          text="uploadNow"
          type="submit"
          handleSubmit={handleSubmit}
          disabled={loadingUploadRecitation}
        />
      </form>
    </div>
  );
};

export default UploadRecitation;
