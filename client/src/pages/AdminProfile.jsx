import React, { useEffect, useState } from "react";
import { Input } from "../components";
import { updateUserProfile } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfileReset } from "../redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import { login } from "../redux/actions/authActions";

const AdminProfile = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, success, data, error } = useSelector(
    (state) => state.updateUserProfile
  );

  const adminEmail = JSON.parse(localStorage.getItem("user"))?.email;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile(email, password));
  };

  useEffect(() => {
    if (success) {
      toast.success("data updated successfully");
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
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
              alt="default img"
              className="min-w-[40px] max-w-[120px] sm:max-w-[200px] rounded-md"
            />
          </span>
          <Input
            labelText="currentEmail"
            type="email"
            name="current-email"
            value={adminEmail}
            disabled={true}
          />
          <Input
            labelText="newEmail"
            type="email"
            name="email"
            value={email}
            placeholder="emailPlaceholder"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            labelText="newPassword"
            type="password"
            name="password"
            value={password}
            placeholder="passwordPlaceholder"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-fit px-5 py-2 bg-orange-600 text-slate-50 hover:bg-orange-700 rounded-lg"
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
          >
            {t("save")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
