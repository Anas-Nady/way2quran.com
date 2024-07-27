"use client";
import { useState } from "react";
import { clipboardCheckIcon, closeIcon, shareIcon } from "../Icons";
import SocialMediaShareBtn from "./SocialMediaShareBtn";

const SharePopup = ({
  pageURLToShare,
  popup,
  handlePopup,
  handleClosePopup,
}) => {
  const [copyURLText, setCopyURLText] = useState(false);

  const handleCopyURL = () => {
    navigator.clipboard.writeText(pageURLToShare);
    setCopyURLText(!copyURLText);

    setTimeout(() => {
      setCopyURLText(false);
    }, 2000);
  };

  return (
    <div
      className={`popup ${
        popup ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-slate-600 bg-opacity-95 z-50 justify-center items-center`}
    >
      <div className="p-4 md:p-5 text-center z-50 border-2 dark:border-gray-500 border-gray-100 bg-slate-200 dark:bg-gray-900 text-slate-50 w-[500px] relative">
        <span
          className="absolute -top-2 -left-1.5 w-8 h-8 cursor-pointer bg-slate-200 text-black border-black dark:bg-gray-900 dark:text-white dark:border-white border rounded-full flex justify-center items-center"
          onClick={() => handlePopup("")}
        >
          {closeIcon}
        </span>
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              {shareIcon}
            </div>
            <input
              type="text"
              id="input-group-1"
              value={pageURLToShare}
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <SocialMediaShareBtn
          pageURL={pageURLToShare}
          handleClosePopup={handleClosePopup}
        />

        <button
          type="button"
          onClick={handleCopyURL}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          <div className="flex items-center justify-center gap-2 font-english">
            {copyURLText ? `Copied URL` : `Copy URL`}
            {copyURLText && <span>{clipboardCheckIcon}</span>}
          </div>
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
