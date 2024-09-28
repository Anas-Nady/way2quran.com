"use client";
import Button from "@/components/ui/Button";
import ReciterImg from "@/components/Reciter/ReciterImg";
import Input from "@/components/ui/Input";
import ToastMessage from "@/components/ui/ToastMessage";
import { createReciter } from "@/actions/reciters";
import { useEffect, useState } from "react";
import { defaultReciterPhoto } from "@/constants/Images";
import { useTranslations } from "next-intl";
import getErrorMessage from "@/helpers/getErrorMessage";

type FormState = {
  arabicName: string;
  englishName: string;
  number: string;
  success: boolean;
  error: string;
  loading: boolean;
  photo: File | null;
  photoDisplay: string;
  invalidImgSize: boolean;
  invalidImgType: boolean;
};

export type CreateReciterProps = {
  arabicName: string;
  englishName: string;
  number?: number;
  photo?: File;
};

export default function AddReciterForm() {
  const t = useTranslations("AddReciter");
  const [formState, setFormState] = useState<FormState>({
    arabicName: "",
    englishName: "",
    number: "",
    success: false,
    error: "",
    loading: false,
    photo: null,
    photoDisplay: defaultReciterPhoto,
    invalidImgSize: false,
    invalidImgType: false,
  });

  const {
    arabicName,
    englishName,
    number,
    success,
    error,
    loading,
    photo,
    photoDisplay,
    invalidImgSize,
    invalidImgType,
  } = formState;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImg = e.target.files?.[0];
    if (!selectedImg) return;

    const isValidImgType =
      selectedImg.type.startsWith("image") &&
      selectedImg.type !== "image/svg+xml";

    if (!isValidImgType) {
      setFormState((prevState) => ({
        ...prevState,
        invalidImgType: true,
        photo: null,
        photoDisplay: defaultReciterPhoto,
      }));
      e.currentTarget.value = "";
      return;
    }

    const isValidImgSize = selectedImg.size <= 1_000_000; // 1MB
    if (!isValidImgSize) {
      setFormState((prevState) => ({
        ...prevState,
        invalidImgSize: true,
        photo: null,
        photoDisplay: defaultReciterPhoto,
      }));
      e.currentTarget.value = "";
      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      invalidImgType: false,
      invalidImgSize: false,
      photo: selectedImg,
      photoDisplay: URL.createObjectURL(selectedImg),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      loading: true,
      error: "",
      success: false,
    }));

    const formData = new FormData();
    formData.append("englishName", englishName);
    formData.append("arabicName", arabicName);
    formData.append("number", number);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await createReciter(formData);
      setFormState((prevState) => ({
        ...prevState,
        success: true,
        englishName: "",
        arabicName: "",
        number: "",
        photo: null,
        photoDisplay: defaultReciterPhoto,
      }));
    } catch (err: unknown) {
      setFormState((prevState) => ({
        ...prevState,
        error: getErrorMessage(err),
      }));
    } finally {
      setFormState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  return (
    <>
      {error && <ToastMessage error message={error} />}
      {success && <ToastMessage success message={t("successCreatedReciter")} />}
      {invalidImgType && (
        <ToastMessage
          error
          message={"Please select an image file (jpg, jpeg, png)"}
        />
      )}
      {invalidImgSize && (
        <ToastMessage
          error
          message={"Please select an image file less than 1MB"}
        />
      )}
      <ReciterImg src={photoDisplay} isCentering={true} />
      <form className="my-5" onSubmit={handleSubmit}>
        <Input
          labelText={t("reciterNumber")}
          type="text"
          name="number"
          id="number"
          value={number}
          required={false}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              number: e.target.value,
            }))
          }
        />
        <Input
          labelText={t("arName")}
          type="text"
          name="arabicName"
          id="arabicName"
          value={arabicName}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              arabicName: e.target.value,
            }))
          }
          required
        />
        <Input
          labelText={t("enName")}
          type="text"
          name="englishName"
          id="englishName"
          value={englishName}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              englishName: e.target.value,
            }))
          }
          required
        />
        <Input
          onChange={handleFileChange}
          labelText={t("photo")}
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          required={false}
        />
        <Button disabled={loading} type="submit">
          {t("saveReciter")}
        </Button>
      </form>
    </>
  );
}
