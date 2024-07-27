"use client";

import Button from "@/components/Button";
import ImgReciter from "@/components/Reciter/ImgReciter";
import Input from "@/components/Input";
import ToastMessage from "@/components/ToastMessage";
import { updateUserProfile } from "@/actions/user";
import { useEffect, useState } from "react";

export default function AdminProfileForm({
  currentEmailTxt,
  newEmailTxt,
  newPasswordTxt,
  saveBtn,
  successUpdateAdminProfileTxt,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorHappen, setErrorHappen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [adminEmail, setAdminEmail] = useState("...");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setSuccessUpdate(false);
    setErrorHappen(false);
    // handle update admin
    try {
      const data = await updateUserProfile(email, password);
      localStorage.setItem("user", JSON.stringify(data?.user));
      setSuccessUpdate(true);
    } catch (err) {
      const currentError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      setErrorHappen(true);
      setErrorMessage(currentError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAdminEmail(JSON.parse(localStorage.getItem("user"))?.email || "");
    if (successUpdate) {
      setEmail("");
      setPassword("");
    }
  }, [successUpdate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorHappen && <ToastMessage error={true} message={errorMessage} />}
        {successUpdate && (
          <ToastMessage success={true} message={successUpdateAdminProfileTxt} />
        )}
        <ImgReciter
          photoDisplay="https://storage.googleapis.com/way2quran_storage/imgs/profile.svg"
          alt="default admin photo"
          isCentering={true}
        />
        <Input
          labelText={currentEmailTxt}
          type="email"
          name="current-email"
          value={adminEmail}
          disabled={true}
          isAdmin={true}
        />
        <Input
          labelText={newEmailTxt}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isAdmin={true}
          required={false}
        />
        <Input
          labelText={newPasswordTxt}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isAdmin={true}
          required={false}
        />

        <Button disabled={loading} text={saveBtn} type="submit" />
      </form>
    </>
  );
}
