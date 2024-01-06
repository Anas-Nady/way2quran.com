import React, { useEffect, useState } from "react";
import { Button, ImgReciter, Input } from "../components";
import { updateUserProfile } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfileReset } from "../redux/slices/userSlice";
import { useTranslation } from "react-i18next";

const AdminProfile = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, success, data, error } = useSelector(
    (state) => state.updateUserProfile
  );

  const adminEmail = JSON.parse(sessionStorage.getItem("user"))?.email;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile(email, password));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("successUpdateAdminProfile"));
      setEmail("");
      setPassword("");
    }
    if (error) {
      toast.error(error);
    }
    dispatch(updateUserProfileReset());
  }, [success, data, error]);

  return (
    <div className="flex justify-center items-center">
      <div className="profile border border-slate-100 dark:border-gray-700 p-5 sm:w-[400px]">
        <form>
          <span className="flex justify-center my-5">
            <ImgReciter
              photoDisplay="https://storage.googleapis.com/way2quran_storage/imgs/profile.svg"
              alt="default admin photo"
            />
          </span>
          <Input
            labelText="currentEmail"
            type="email"
            name="current-email"
            value={adminEmail}
            disabled={true}
            isAdmin={true}
          />
          <Input
            labelText="newEmail"
            type="email"
            name="email"
            value={email}
            placeholder="emailPlaceholder"
            onChange={(e) => setEmail(e.target.value)}
            isAdmin={true}
          />
          <Input
            labelText="newPassword"
            type="password"
            name="password"
            value={password}
            placeholder="passwordPlaceholder"
            onChange={(e) => setPassword(e.target.value)}
            isAdmin={true}
          />

          <Button
            text="save"
            handleSubmit={handleSubmit}
            type="submit"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
