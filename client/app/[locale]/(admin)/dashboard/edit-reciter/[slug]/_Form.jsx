"use client";

import Button from "@/components/Button";
import ReciterImg from "@/components/Reciter/ReciterImg";
import Input from "@/components/Input";
import ToastMessage from "@/components/ToastMessage";
import TopReciterCheckBox from "./_TopReciterCheckBox";
import { updateReciter } from "@/actions/reciters";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form({
  reciter,
  arNameTxt,
  enNameTxt,
  numberTxt,
  photoTxt,
  saveTxt,
  topRecitersTxt,
  currentLang,
}) {
  const [arabicName, setArabicName] = useState(reciter.arabicName);
  const [englishName, setEnglishName] = useState(reciter.englishName);
  const [photo, setPhoto] = useState(null);
  const [isTopReciter, setIsTopReciter] = useState(reciter.isTopReciter);
  const [photoDisplay, setPhotoDisplay] = useState(reciter.photo);
  const [number, setNumber] = useState(reciter.number);

  const [loading, setLoading] = useState(false);
  const [errorHappen, setErrorHappen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedImg = e.target.files[0];
    setPhoto(selectedImg);
    setPhotoDisplay(URL.createObjectURL(selectedImg));
  };

  const handleTopReciters = () => {
    setIsTopReciter((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("englishName", englishName);
    formData.append("arabicName", arabicName);
    if (photo) {
      formData.append("photo", photo);
    }
    formData.append("isTopReciter", isTopReciter);

    try {
      await updateReciter(reciter.slug, formData);
      router.replace(
        `/${currentLang}/dashboard/preview-reciter/${reciter.slug}`
      );
    } catch (err) {
      const currentError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      setErrorMessage(currentError);
      setIsTopReciter(reciter.isTopReciter);
      setErrorHappen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border border-slate-300 dark:border-gray-700 sm:w-[500px] mx-3 p-10">
        {errorHappen && <ToastMessage error={true} message={errorMessage} />}
        {photoDisplay && (
          <ReciterImg photoDisplay={photoDisplay} isCentering={true} />
        )}
        <form>
          <Input labelText={numberTxt} name="number" value={number} readOnly />
          <Input
            labelText={arNameTxt}
            name="arabicName"
            value={arabicName}
            onChange={(e) => setArabicName(e.target.value)}
          />
          <Input
            labelText={enNameTxt}
            name="englishName"
            extraClasses="font-english"
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
          />
          <Input
            onChange={handleFileChange}
            labelText={photoTxt}
            type="file"
            name="photo"
            accept="image/*"
          />
          <TopReciterCheckBox
            topReciter={isTopReciter}
            topRecitersTxt={topRecitersTxt}
            handleTopReciters={handleTopReciters}
          />
          <Button
            text={saveTxt}
            handleSubmit={handleSubmit}
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
}
