"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import ToastMessage from "@/components/ToastMessage";
import { logoutIcon } from "@/components/Icons";

export default function LogoutBtn({ logoutTxt, isOpen }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorHappen, setErrorHappen] = useState("");

  const handleLogout = async () => {
    setErrorHappen(false);
    setLoading(true);

    try {
      await logout();
      localStorage.removeItem("user");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      setErrorHappen(true);
      setErrorMessage(errorMessage || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errorHappen && <ToastMessage error={true} message={errorMessage} />}
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`flex w-full ${
          loading && "opacity-40 cursor-not-allowed"
        } gap-2 text-gray-900  dark:text-slate-50 text-xl hover:bg-slate-200 px-2 py-2 rounded duration-300 dark:hover:bg-gray-900`}
      >
        <span className={`${!isOpen && "rotate-[360deg]"} duration-500`}>
          {logoutIcon}
        </span>

        {isOpen && (
          <li className={`${!isOpen && "scale-0"} duration-300 `}>
            {logoutTxt}
          </li>
        )}
      </button>
    </>
  );
}
