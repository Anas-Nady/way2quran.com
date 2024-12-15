"use client";

import React, { useEffect, useState } from "react";
import { closeIcon, errorToastIcon, successToastIcon } from "../Icons";
import getTextDirection from "@/helpers/getTextDirection";
import getFontClass from "@/helpers/getFontClass";

interface ToastMessageProps {
  success?: boolean;
  error?: boolean;
  message: string;
  duration?: number;
  resetErrorState?: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  success = false,
  error = false,
  message,
  duration = 8000,
  resetErrorState = () => {},
}) => {
  const [toastVisibility, closeToastMessage] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeToastMessage(false);
      resetErrorState();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  const handleDismissClick = () => {
    closeToastMessage(false);
    resetErrorState();
  };

  return (
    <div
      className={`${!toastVisibility && "hidden"} ${getFontClass(
        message
      )} flex absolute top-7 z-50 left-1/2 transform -translate-x-1/2 items-center w-full gap-4 max-w-[400px] mx-auto p-4 mb-4 text-gray-500 bg-white rounded-lg shadow border border-gray-300 dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800`}
      role="alert"
      dir={getTextDirection(message)}
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-lg ${
          success && "text-green-500 dark:text-green-300"
        } ${error && "text-red-500 dark:text-red-200 dark:bg-red-800"}`}
      >
        {success && successToastIcon}
        {error && errorToastIcon}
      </div>
      <div className="font-normal text-gray-900 ms-3 text-md dark:text-white line-clamp-5">
        {message}
      </div>
      <button
        className="ms-auto -mx-1.5 -my-1.5 bg-white border border-gray-400 text-gray-800 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-100 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        type="button"
        onClick={handleDismissClick}
      >
        {closeIcon}
      </button>
    </div>
  );
};

export default ToastMessage;
