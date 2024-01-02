import React, { useEffect, useState } from "react";
import { Button, Input } from "./../components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createReciter } from "../redux/actions/reciterAction";
import { createReciterReset } from "../redux/slices/reciterSlice";
import { toast } from "react-toastify";

const AddReciter = () => {
  const defaultImg =
    "https://storage.googleapis.com/way2quran_storage/imgs/reciter-default-photo.svg";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, success, data, error } = useSelector(
    (state) => state.createReciter
  );

  const [name, setName] = useState("");
  const [name_ar, setNameAR] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoDisplay, setPhotoDisplay] = useState(defaultImg);

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
    formData.append("number", number);
    formData.append("photo", photo);

    await dispatch(createReciter(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("successCreatedReciter"));
      setName("");
      setNameAR("");
      setNumber("");
      setPhoto(null);
      setPhotoDisplay(defaultImg);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(createReciterReset());
  }, [success, error, dispatch, photoDisplay, photo]);

  return (
    <div className="flex justify-center items-center ">
      <div className="border border-slate-300 dark:border-gray-700  sm:w-[500px] mx-3 p-10">
        <span className="flex justify-center">
          <img
            src={photoDisplay}
            alt="default img"
            className="rounded-lg sm:w-[200px] h-[150px] object-fill"
          />
        </span>
        <form className="my-5">
          <Input
            labelText="reciterNumber"
            type="text"
            name="number"
            value={number}
            placeholder={t("reciterNumber")}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Input
            labelText="arName"
            type="text"
            name="name_ar"
            placeholder={t("arName")}
            value={name_ar}
            onChange={(e) => setNameAR(e.target.value)}
            required
          />
          <Input
            labelText="enName"
            type="text"
            name="name"
            value={name}
            placeholder={t("enName")}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            onChange={handleFileChange}
            labelText="photo"
            type="file"
            name="photo"
          />

          <Button
            type="submit"
            text="saveReciter"
            handleSubmit={handleSubmit}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AddReciter;
