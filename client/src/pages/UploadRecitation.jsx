import React, { useEffect, useState } from "react";
import { Button, Layout, Input } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { listFrequentRecitations } from "../redux/actions/frequentRecitationsAction";
import { listReciters, uploadRecitation } from "../redux/actions/reciterAction";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { uploadRecitationReset } from "../redux/slices/reciterSlice";
import { checkedIcon } from "../components/Icons";
import Select from "../components/Select";

const UploadRecitation = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [reciterSlug, setReciterSlug] = useState("");
  const [recitationSlug, setRecitationSlug] = useState("");
  const [fileDetails, setFileDetails] = useState([]);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setAudioFiles(files);

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        // You can perform additional actions here if needed
        // For example, you can display the file name or update some state

        // Assuming you have a state variable fileDetails to store details
        setFileDetails((prevFileDetails) => [
          ...prevFileDetails,
          {
            name: file.name,
          },
        ]);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
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
    progress,
  } = useSelector((state) => state.uploadRecitation);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(uploadRecitation(recitationSlug, reciterSlug, audioFiles));
  };

  useEffect(() => {
    dispatch(listFrequentRecitations());
    dispatch(listReciters());

    if (errorUploading) {
      toast.error(errorUploading, { autoClose: false });
    }
    if (successUpload) {
      toast.success(t("successUploadedAudioFiles"), { autoClose: false });
      setFileDetails([]);
      setReciterSlug("");
      setRecitationSlug("");
      setAudioFiles([]);
    }
    dispatch(uploadRecitationReset());
  }, [successUpload, errorUploading]);

  return (
    <Layout>
      <div className=" flex justify-between gap-2 flex-wrap max-w-screen-xl mx-auto">
        <form>
          <div className="flex justify-start gap-2 flex-col items-start w-[300px]">
            <Select
              value={recitationSlug}
              onChange={(e) => setRecitationSlug(e.target.value)}
              options={recitations}
              loading={loading}
              placeholder="chooseRecitation"
            />

            <Select
              value={reciterSlug}
              onChange={(e) => setReciterSlug(e.target.value)}
              options={reciters}
              loading={loading}
              placeholder="chooseReciter"
            />

            <Input
              name="audioFiles"
              required={true}
              type="file"
              isAdmin={true}
              onChange={handleFileUpload}
              multiple={true}
              accept="audio/*"
            />
          </div>

          <Button
            text="uploadNow"
            type="submit"
            handleSubmit={handleSubmit}
            disabled={loadingUploadRecitation}
          />
        </form>

        <div className="preview-uploaded-recitation border border-slate-300 dark:border-gray-700 w-fit lg:w-[500px] max-w-[500] px-3 py-2">
          <div className="parent flex justify-center flex-wrap gap-2">
            {fileDetails &&
              fileDetails.map((file, i) => (
                <div
                  key={i}
                  className="one p-2 text-gray-900 dark:text-white bg-slate-200 dark:bg-gray-700 rounded-sm my-1 flex justify-between  "
                >
                  <span dir="ltr" className="font-english ring-transparent">
                    {file.name}
                  </span>
                  <span>{checkedIcon}</span>
                </div>
              ))}
          </div>
        </div>
        <progress
          className="w-full my-3"
          value={progress}
          max="100"
          style={{ display: loadingUploadRecitation ? "block" : "none" }}
        />
      </div>
    </Layout>
  );
};

export default UploadRecitation;
