"use client";
import Button from "@/components/Button";
import { checkedIcon } from "@/components/Icons";
import Input from "@/components/Input";
import ProgressBar from "./_ProgressBar";
import React, { useEffect, useState } from "react";
import SelectOptions from "./_SelectOptions";
import ToastMessage from "@/components/ToastMessage";

import api from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function UploadRecitationForm({
  currentLang,
  chooseRecitationTxt,
  chooseReciterTxt,
  uploadNowTxt,
  successUploadedAudioFilesTxt,
}) {
  const audioPattern = /\b\d{3}\.[a-zA-Z0-9]+\b/;

  const [audioFiles, setAudioFiles] = useState([]);
  const [reciterSlug, setReciterSlug] = useState("");
  const [recitationSlug, setRecitationSlug] = useState("");
  const [fileDetails, setFileDetails] = useState([]);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHappen, setErrorHappen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successUpload, setSuccessUpload] = useState(false);

  const [reciters, setReciters] = useState([]);
  const [recitations, setRecitations] = useState([]);

  const [loadingData, setLoadingData] = useState(false);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setAudioFiles(files);

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        setFileDetails((prevFileDetails) => [
          ...prevFileDetails,
          {
            name: file.name,
            number: file.name.split(".")[0],
            size: Math.round(file.size / 1000),
          },
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorHappen(false);
    setLoading(true);
    setSuccessUpload(false);

    const formData = new FormData();
    for (let i = 0; i < audioFiles.length; i++) {
      formData.append("audioFiles", audioFiles[i]);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      };

      const { data } = await api.put(
        `/api/reciters/upload-recitation/${reciterSlug}/${recitationSlug}`,
        formData,
        config
      );

      setSuccessUpload(true);
      setAudioFiles([]);
      setFileDetails([]);
      setReciterSlug("");
      setRecitationSlug("");
      setProgress(0);
      // Clear file input value after upload
      document.getElementById("fileInput").value = "";
    } catch (err) {
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      setErrorMessage(errorMessage || "An error occurred during login.");
      setErrorHappen(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const resRecitations = await fetch(`/api/recitations`);
      const resReciters = await fetch(
        `/api/reciters?sort=-number&pageSize=10000`,
        { cache: "no-store" }
      );

      const dataRecitations = await resRecitations.json();
      const dataReciters = await resReciters.json();

      setReciters(dataReciters.reciters);
      setRecitations(dataRecitations.recitations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {errorHappen && (
        <ToastMessage
          duration={9_000_000}
          error={true}
          message={errorMessage}
        />
      )}
      {successUpload && (
        <ToastMessage
          success={true}
          message={successUploadedAudioFilesTxt}
          duration={9_000_000}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start gap-2 flex-col items-start max-w-[300px]">
          <span className="flex gap-2">
            <SelectOptions
              currentLang={currentLang}
              value={recitationSlug}
              onChange={(e) => setRecitationSlug(e.target.value)}
              options={recitations}
              placeholder={chooseRecitationTxt}
              loadingData={loadingData}
            />
          </span>

          <span className="flex gap-2">
            <SelectOptions
              currentLang={currentLang}
              value={reciterSlug}
              onChange={(e) => setReciterSlug(e.target.value)}
              options={reciters}
              placeholder={chooseReciterTxt}
              loadingData={loadingData}
            />
          </span>

          <Input
            name="audioFiles"
            type="file"
            id="fileInput"
            isAdmin={true}
            onChange={handleFileUpload}
            multiple={true}
            accept="audio/*"
          />
        </div>

        <Button disabled={loading} text={uploadNowTxt} type="submit" />
      </form>

      {fileDetails.length > 0 && (
        <div className="preview-uploaded-recitation max-h-[346px] overflow-y-auto no-overflow-style border border-slate-300 dark:border-gray-700 w-fit lg:w-[500px] max-w-[500] px-3 py-2">
          <div className="flex flex-wrap justify-center gap-2 parent">
            {fileDetails.map((file, i) => (
              <div
                key={i}
                className={`p-2 ${
                  file.size < 100 ||
                  file.number > 114 ||
                  audioPattern.test(file.name) !== true
                    ? "bg-red-500 text-white dark:bg-red-500 dark:text-white"
                    : "text-gray-900 dark:text-white bg-slate-200 dark:bg-gray-700"
                } rounded-sm my-1 flex justify-between`}
              >
                <span dir="ltr" className="font-english ring-transparent">
                  {file.name}
                </span>

                <span>{checkedIcon}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {progress !== 0 && <ProgressBar progress={progress} />}
    </>
  );
}
