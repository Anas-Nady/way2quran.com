"use client";
import Button from "@/components/Button";
import ImgReciter from "@/components/Reciter/ImgReciter";
import Input from "@/components/Input";
import ToastMessage from "@/components/ToastMessage";
import { createReciter } from "@/actions/reciters";
import { useEffect, useState } from "react";
import { defaultReciterPhoto } from "@/constants/images";

export default function AddReciterForm({
  reciterNumberTxt,
  arNameTxt,
  enNameTxt,
  photoTxt,
  saveReciterTxt,
  successCreatedReciterTxt,
}) {
  const [arabicName, setArabicName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [number, setNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [photoDisplay, setPhotoDisplay] = useState(defaultReciterPhoto);

  const [invalidImgType, setInvalidImgType] = useState(false);
  const [invalidImgSize, setInvalidImgSize] = useState(false);

  const handleFileChange = (e) => {
    const selectedImg = e.target.files[0];
    const isValidImgType =
      selectedImg.type.startsWith("image") &&
      selectedImg.type !== "image/svg+xml";

    if (!isValidImgType) {
      setInvalidImgType(true);
      e.currentTarget.value = "";
      setPhoto("");
      setPhotoDisplay(defaultReciterPhoto);
      return;
    }
    const isValidImgSize = selectedImg.size <= 1_000_000; // 1MB

    if (!isValidImgSize) {
      setInvalidImgSize(true);
      e.currentTarget.value = "";
      setPhoto("");
      setPhotoDisplay(defaultReciterPhoto);
      return;
    }

    setInvalidImgType(false);
    setInvalidImgSize(false);
    setPhoto(selectedImg);
    setPhotoDisplay(URL.createObjectURL(selectedImg));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const formData = new FormData();
    formData.append("englishName", englishName);
    formData.append("arabicName", arabicName);
    formData.append("number", number);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const data = await createReciter(formData);
      setSuccess(true);
    } catch (err) {
      const currentError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      setErrorMessage(currentError);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setEnglishName("");
      setArabicName("");
      setNumber("");
      setPhoto(null);
      setPhotoDisplay(defaultReciterPhoto);
    }
  }, [success, error]);

  return (
    <>
      {error && <ToastMessage error message={errorMessage} />}
      {success && <ToastMessage success message={successCreatedReciterTxt} />}
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
      <ImgReciter photoDisplay={photoDisplay} isCentering={true} />

      <form className="my-5" onSubmit={handleSubmit}>
        <Input
          labelText={reciterNumberTxt}
          isAdmin={true}
          type="text"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required={false}
        />
        <Input
          labelText={arNameTxt}
          isAdmin={true}
          type="text"
          name="arabicName"
          value={arabicName}
          onChange={(e) => setArabicName(e.target.value)}
          required
        />
        <Input
          labelText={enNameTxt}
          isAdmin={true}
          type="text"
          name="englishName"
          value={englishName}
          onChange={(e) => setEnglishName(e.target.value)}
          required
        />
        <Input
          onChange={handleFileChange}
          isAdmin={true}
          labelText={photoTxt}
          type="file"
          name="photo"
          accept="image/*"
          required={false}
        />

        <Button disabled={loading} type="submit" text={saveReciterTxt} />
      </form>
    </>
  );
}
