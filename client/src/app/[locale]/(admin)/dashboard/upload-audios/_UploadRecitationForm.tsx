"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { checkedIcon } from "@/components/Icons";
import Input from "@/components/ui/Input";
import ProgressBar from "./_ProgressBar";
import ToastMessage from "@/components/ui/ToastMessage";
import api from "@/lib/Api";
import { RECITATIONS } from "@/constants/Recitations";
import { useTranslations } from "next-intl";
import SelectOptions from "@/components/ui/SelectOptions";
import { AxiosProgressEvent } from "axios";
import { listAllReciters } from "@/actions/reciters";
import getErrorMessage from "@/helpers/getErrorMessage";

type FileDetails = {
  name: string;
  size: number;
  number: number;
};

interface FormState {
  loading: boolean;
  error: string;
  success: boolean;
  successUpload: boolean;
  reciterSlug: string;
  recitationSlug: string;
  audioFiles: File[];
  fileDetails: FileDetails[];
  progress: number;
  reciters: ReciterProfile[];
}

export default function UploadRecitationForm({ locale }: LocaleProps) {
  const t = useTranslations("UploadRecitationPage");
  const audioPattern = /\b\d{3}\.[a-zA-Z0-9]+\b/;

  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: "",
    success: false,
    successUpload: false,
    reciterSlug: "",
    recitationSlug: "",
    audioFiles: [],
    fileDetails: [],
    progress: 0,
    reciters: [],
  });

  const {
    audioFiles,
    fileDetails,
    loading,
    successUpload,
    reciterSlug,
    recitationSlug,
    progress,
    reciters,
    error,
  } = formState;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setFormState((prev) => ({
        ...prev,
        audioFiles: newFiles,
        fileDetails: newFiles.map((file) => ({
          name: file.name,
          number: parseInt(file.name.split(".")[0], 10),
          size: Math.round(file.size / 1000),
        })),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({
      ...prev,
      loading: true,
      successUpload: false,
      error: "",
      progress: 0,
    }));

    const formData = new FormData();
    audioFiles.forEach((file) => {
      formData.append("audioFiles", file);
    });

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setFormState((prev) => ({ ...prev, progress: percentCompleted }));
        },
      };

      await api.post(
        `/api/recitations/files/audio/${reciterSlug}/${recitationSlug}`,
        formData,
        config
      );

      setFormState((prev) => ({
        ...prev,
        successUpload: true,
        audioFiles: [],
        fileDetails: [],
        progress: 100,
      }));

      (document.getElementById("fileInput") as HTMLInputElement).value = "";
      handleRestartServer();
    } catch (err: unknown) {
      setFormState((prev) => ({
        ...prev,
        error: getErrorMessage(err),
      }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false, progress: 0 }));
    }
  };

  // Add type annotation for the fetchData function
  const fetchData = async (): Promise<void> => {
    setFormState((prev) => ({ ...prev, loading: true }));
    try {
      const resReciters = await listAllReciters({
        sortBy: "-number",
        pageSize: 10000,
      });
      const dataReciters = await resReciters.json();
      setFormState((prev) => ({ ...prev, reciters: dataReciters.reciters }));
    } catch (error) {
      console.log(error);
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRestartServer = async () => {
    try {
      const res = await fetch("/api/restart-server", {
        method: "POST",
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && (
        <ToastMessage duration={9_000_000} error={true} message={error} />
      )}
      {successUpload && (
        <ToastMessage
          success={true}
          message={t("successUploadedAudioFiles")}
          duration={9_000_000}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start gap-2 flex-col items-start max-w-[300px]">
          <span className="flex gap-2">
            <SelectOptions
              locale={locale}
              value={recitationSlug}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormState((prev) => ({
                  ...prev,
                  recitationSlug: e.target.value,
                }))
              }
              options={RECITATIONS}
              placeholder={t("chooseRecitation")}
              required={true}
            />
          </span>

          <span className="flex gap-2">
            <SelectOptions
              locale={locale}
              value={reciterSlug}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormState((prev) => ({
                  ...prev,
                  reciterSlug: e.target.value,
                }))
              }
              options={reciters}
              placeholder={t("chooseReciter")}
              required={true}
            />
          </span>
          <Input
            name="audioFiles"
            type="file"
            id="fileInput"
            labelText=""
            onChange={handleFileUpload}
            multiple={true}
            accept="audio/*"
          />
        </div>
        <Button isLoading={loading} disabled={loading} type="submit">
          {t("uploadNow")}
        </Button>
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
      {progress > 0 && (
        <ProgressBar
          progress={progress}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      )}
    </>
  );
}
