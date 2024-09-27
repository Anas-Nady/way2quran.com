"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { logoutIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import ToastMessage from "@/components/ui/ToastMessage";
import getErrorMessage from "@/helpers/getErrorMessage";

interface LogoutBtnProps {
  isOpen: boolean;
}

const LogoutBtn: React.FC<LogoutBtnProps> = ({ isOpen }) => {
  const router = useRouter();
  const [state, setState] = useState({
    error: "",
    loading: false,
  });
  const translate = useTranslations("DashboardLinks");

  const handleLogout = async () => {
    try {
      setState({ loading: true, error: "" });
      await logout();
      localStorage.removeItem("user");
      router.push("/");
      setState({ loading: false, error: "" });
    } catch (err: unknown) {
      setState({ loading: false, error: getErrorMessage(err) });
    }
  };

  return (
    <>
      {state.error && <ToastMessage error={true} message={state.error} />}
      <button
        onClick={handleLogout}
        disabled={state.loading}
        className={`flex w-full ${
          state.loading && "opacity-40 cursor-not-allowed"
        } gap-2 text-gray-900  dark:text-slate-50 text-xl hover:bg-slate-200 px-2 py-2 rounded duration-300 dark:hover:bg-gray-900`}
      >
        <span className={`${!isOpen && "rotate-[360deg]"} duration-500`}>
          {logoutIcon}
        </span>

        {isOpen && (
          <li className={`${!isOpen && "scale-0"} duration-300 `}>
            {translate("logout")}
          </li>
        )}
      </button>
    </>
  );
};

export default LogoutBtn;
