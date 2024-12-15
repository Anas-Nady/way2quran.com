"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SelectOptions from "@/components/ui/SelectOptions";
import ToastMessage from "@/components/ui/ToastMessage";
import getErrorMessage from "@/helpers/getErrorMessage";
import api from "@/lib/Api";
import { AxiosProgressEvent } from "axios";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import ProgressBar from "../upload-audios/_ProgressBar";

interface IFormState {
  reciterSlug: string;
  recitationSlug: string;
  loading: boolean;
  error: string;
  zipFile?: File | null;
  progress: number;
  success: string;
}

interface IFileZipState {
  name: string;
  size: number;
  error: string;
}

export default function UploadZipFileForm({ locale }: { locale: "ar" | "en" }) {
  const t = useTranslations("UploadRecitationPage");

  const [recitersState, setRecitersState] = useState({
    reciters: [],
    loading: false,
    error: "",
  });

  const [fileZipState, setFileZipState] = useState<IFileZipState>({
    size: 0,
    name: "",
    error: "",
  });

  const [recitationsState, setRecitationsState] = useState({
    recitations: [],
    loading: false,
    error: "",
  });

  const [formState, setFormState] = useState<IFormState>({
    reciterSlug: "",
    recitationSlug: "",
    loading: false,
    error: "",
    zipFile: null,
    progress: 0,
    success: "",
  });

  useEffect(() => {
    getReciters();
  }, []);

  const getReciters = async () => {
    try {
      setRecitersState((prev) => ({ ...prev, loading: true }));
      const response = await fetch(
        `/api/reciters/missing-recitation-downloadURL`
      );
      if (!response.ok) {
        setRecitersState((prev) => ({
          ...prev,
          error: getErrorMessage(response),
        }));
      }
      const data = await response.json();
      setRecitersState((prev) => ({
        ...prev,
        reciters: data.reciters,
      }));
    } catch (err: unknown) {
      setRecitersState((prev) => ({ ...prev, error: getErrorMessage(err) }));
    } finally {
      setRecitersState((prev) => ({ ...prev, loading: false }));
    }
  };

  const getReciterRecitations = async (reciterSlug: string) => {
    try {
      setRecitationsState((prev) => ({
        ...prev,
        recitations: [],
        loading: true,
      }));
      const response = await fetch(
        `/api/recitations/missing-downloadURL/${reciterSlug}`
      );
      if (!response.ok) {
        setRecitationsState((prev) => ({
          ...prev,
          error: getErrorMessage(response),
        }));
      }
      const data = await response.json();
      setRecitationsState((prev) => ({
        ...prev,
        recitations: data.recitations,
      }));
    } catch (err: unknown) {
      setRecitationsState((prev) => ({ ...prev, error: getErrorMessage(err) }));
    } finally {
      setRecitationsState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleZipFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setFileZipState((prev) => ({
        ...prev,
        error: t("noZipFileSelected"),
      }));
    } else {
      const file = files[0];
      const fileName = file.name;
      const fileSize = parseFloat((file.size / 1000 / 1000).toFixed(2)); // in MB

      const isZip = fileName.endsWith(".zip");
      if (!isZip) {
        setFileZipState((prev) => ({
          ...prev,
          error: t("notZipFile"),
        }));
        (document.getElementById("zipFile") as HTMLInputElement).value = "";
        return;
      } else {
        setFileZipState((prev) => ({
          ...prev,
          size: fileSize,
          name: fileName,
        }));
      }
      setFormState((prev) => ({ ...prev, zipFile: file }));
    }
  };

  const handleReciterChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, reciterSlug: e.target.value }));
    await getReciterRecitations(e.target.value);
  };

  const handleRecitationChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, recitationSlug: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({
      ...prev,
      loading: true,
      error: "",
      success: "",
    }));

    try {
      const formData = new FormData();

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

      if (formState.zipFile) {
        formData.append("zipFile", formState.zipFile);
      } else {
        setFormState((prev) => ({
          ...prev,
          loading: false,
          error: t("notZipFile"),
        }));
        return;
      }

      const { reciterSlug, recitationSlug } = formState;

      await api.post(
        `/api/recitations/files/zip/${reciterSlug}/${recitationSlug}`,
        formData,
        config
      );

      setFormState((prev) => ({
        ...prev,
        recitationSlug: "",
        loading: false,
        progress: 0,
        success: t("successUploadedAudioFiles"),
      }));
      if (recitationsState.recitations.length > 1) {
        await getReciterRecitations(reciterSlug);
        setFormState((prev) => ({
          ...prev,
          recitationSlug: "",
        }));
      } else {
        await getReciters();
        setFormState((prev) => ({
          ...prev,
          recitationSlug: "",
          reciterSlug: "",
        }));
      }
      setFileZipState((prev) => ({ ...prev, size: 0, name: "" }));
      (document.getElementById("zipFile") as HTMLInputElement).value = "";
    } catch (err: unknown) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: getErrorMessage(err),
      }));
    }
  };

  return (
    <div className="flex justify-between flex-1 gap-5 flex-wrap">
      {formState.success && (
        <ToastMessage
          duration={9_000_000}
          success
          message={formState.success}
          resetErrorState={() =>
            setFormState((prev) => ({ ...prev, success: "" }))
          }
        />
      )}
      {formState.error && (
        <ToastMessage
          duration={9_000_000}
          error
          message={formState.error}
          resetErrorState={() =>
            setFormState((prev) => ({ ...prev, error: "" }))
          }
        />
      )}
      {fileZipState.error && (
        <ToastMessage
          resetErrorState={() =>
            setFileZipState((prev) => ({ ...prev, error: "" }))
          }
          error
          message={fileZipState.error}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start gap-2 flex-col items-start max-w-[300px]">
          <span className="flex gap-2">
            <SelectOptions
              locale={locale}
              value={formState.reciterSlug}
              onChange={handleReciterChange}
              options={recitersState.reciters}
              placeholder={t("chooseReciter")}
              required={true}
            />
          </span>

          <span className="flex gap-2">
            <SelectOptions
              locale={locale}
              value={formState.recitationSlug}
              onChange={handleRecitationChange}
              options={recitationsState.recitations}
              placeholder={t("chooseRecitation")}
              required={true}
            />
          </span>
          <Input
            name="zipFile"
            type="file"
            id="zipFile"
            labelText=""
            onChange={handleZipFileUpload}
            accept=".zip"
          />
        </div>
        <Button
          isLoading={formState.loading}
          disabled={formState.loading}
          type="submit"
        >
          {t("uploadNow")}
        </Button>
      </form>
      <div className="flex-1 p-4 text-xl flex-grow border border-gray-700 rounded">
        <div>
          {fileZipState.name && (
            <>
              {t("fileName")}:{" "}
              <span className="font-bold">{fileZipState?.name}</span>
            </>
          )}
        </div>
        <div>
          {fileZipState.size > 0 && (
            <>
              {t("fileSize")}:{" "}
              <span className="font-bold text-green-500">
                {fileZipState?.size} MB
              </span>
            </>
          )}
        </div>

        {formState.progress > 0 && (
          <ProgressBar
            progress={formState.progress}
            aria-valuenow={formState.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        )}
      </div>
    </div>
  );
}
