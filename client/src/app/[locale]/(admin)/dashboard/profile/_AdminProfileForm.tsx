"use client";

import Button from "@/components/ui/Button";
import ReciterImg from "@/components/Reciter/ReciterImg";
import Input from "@/components/ui/Input";
import ToastMessage from "@/components/ui/ToastMessage";
import { updateUserProfile } from "@/actions/user";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import getErrorMessage from "@/helpers/getErrorMessage";

export default function AdminProfileForm() {
  const t = useTranslations("AdminProfile");

  const [fromState, setFormState] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    successUpdate: false,
    currentEmail: "...",
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({
      ...prev,
      loading: true,
      error: "",
      successUpdate: false,
    }));

    try {
      const { email, password } = fromState;
      const data = await updateUserProfile(email, password);
      localStorage.setItem("user", JSON.stringify(data?.user));
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: "",
        successUpdate: true,
      }));
    } catch (err: unknown) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: getErrorMessage(err),
      }));
    }
  };

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      currentEmail: JSON.parse(localStorage.getItem("user") || "")?.email,
    }));
    if (fromState.successUpdate) {
      setFormState((prev) => ({ ...prev, email: "", password: "" }));
    }
  }, [fromState.successUpdate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fromState.error && (
          <ToastMessage error={true} message={fromState.error} />
        )}
        {fromState.successUpdate && (
          <ToastMessage
            success={true}
            message={t("successUpdateAdminProfile")}
          />
        )}
        <ReciterImg
          src="https://storage.googleapis.com/way2quran_storage/imgs/profile.svg"
          alt="default admin photo"
          isCentering={true}
        />
        <Input
          labelText={t("currentEmail")}
          type="email"
          name="current-email"
          id="current-email"
          value={fromState.currentEmail}
          disabled={true}
        />
        <Input
          labelText={t("newEmail")}
          type="email"
          name="email"
          id="email"
          value={fromState.email}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, email: e.target.value }))
          }
          required={false}
        />
        <Input
          labelText={t("newPassword")}
          type="password"
          id="password"
          name="password"
          value={fromState.password}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, password: e.target.value }))
          }
          required={false}
        />

        <Button
          disabled={fromState.loading}
          isLoading={fromState.loading}
          type="submit"
        >
          {t("save")}
        </Button>
      </form>
    </>
  );
}
