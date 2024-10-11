"use client";

import React, { useState } from "react";
import ReciterImg from "@/components/Reciter/ReciterImg";
import { updateReciter } from "@/actions/reciters";
import { useRouter } from "next/navigation";
import ToastMessage from "@/components/ui/ToastMessage";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { ChangeEvent, FormEvent } from "react";
import Checkbox from "../../../../../../components/ui/Checkbox";
import getErrorMessage from "@/helpers/getErrorMessage";

interface FormState {
  arabicName: string;
  englishName: string;
  photo: File | null;
  isTopReciter: boolean;
  photoDisplay: string;
  number: number;
}

type FormProps = LocaleProps & {
  reciter: ReciterProfile;
};

export default function Form({ reciter, locale }: FormProps) {
  const [formState, setFormState] = useState<FormState>({
    arabicName: reciter.arabicName,
    englishName: reciter.englishName,
    photo: null,
    isTopReciter: Boolean(reciter.isTopReciter),
    photoDisplay: reciter.photo,
    number: reciter.number,
  });

  const t = useTranslations("EditReciterPage");
  const translations = {
    numberTxt: t("reciterNumber"),
    arNameTxt: t("arName"),
    enNameTxt: t("enName"),
    photoTxt: t("photo"),
    saveTxt: t("save"),
    topRecitersTxt: t("topReciters"),
    notFoundDataTxt: t("notFoundData"),
    confirmDeleteTxt: t("confirmDelete"),
  };

  const [loading, setLoading] = useState(false);
  const [errorHappen, setErrorHappen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImg = e.target.files?.[0];
    if (selectedImg) {
      setFormState((prev) => ({
        ...prev,
        photo: selectedImg,
        photoDisplay: URL.createObjectURL(selectedImg),
      }));
    }
  };

  const handleTopReciters = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, isTopReciter: checked }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("englishName", formState.englishName);
    formData.append("arabicName", formState.arabicName);
    if (formState.photo) {
      formData.append("photo", formState.photo);
    }
    formData.append("isTopReciter", formState.isTopReciter.toString());

    try {
      await updateReciter(reciter.slug, formData);
      router.replace(`/${locale}/dashboard/preview-reciter/${reciter.slug}`);
    } catch (err: unknown) {
      setErrorMessage(getErrorMessage(err));
      setFormState((prev) => ({
        ...prev,
        isTopReciter: Boolean(reciter.isTopReciter),
      }));
      setErrorHappen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-slate-300 dark:border-gray-700 sm:w-[500px] mx-3 p-10">
      {errorHappen && <ToastMessage error={true} message={errorMessage} />}
      {formState.photoDisplay && (
        <ReciterImg src={formState.photoDisplay} isCentering={true} />
      )}
      <form onSubmit={handleSubmit}>
        <Input
          labelText={translations.numberTxt}
          name="number"
          id="number"
          value={formState.number}
          readonly
          required={false}
        />
        <Input
          labelText={translations.arNameTxt}
          name="arabicName"
          id="arabicName"
          value={formState.arabicName}
          onChange={handleInputChange}
          required={false}
        />
        <Input
          labelText={translations.enNameTxt}
          name="englishName"
          id="englishName"
          className="font-english"
          value={formState.englishName}
          onChange={handleInputChange}
          required={false}
        />
        <Input
          onChange={handleFileChange}
          labelText={translations.photoTxt}
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          required={false}
        />
        <Checkbox
          labelText={translations.topRecitersTxt}
          checked={formState.isTopReciter}
          onChange={handleTopReciters}
        />
        <Button type="submit" disabled={loading}>
          {translations.saveTxt}
        </Button>
      </form>
    </div>
  );
}
