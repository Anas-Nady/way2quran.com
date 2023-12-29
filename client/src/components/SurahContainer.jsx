import React from "react";
import Button from "./Button";
import { downloadIcon, listenIcon, shareIcon } from "./Icons";

const SurahContainer = ({
  currentLang,
  surahInfo,
  handleListening,
  handlePopup,
}) => {
  const { number, translation, name, name_ar, url, downloadUrl } = surahInfo;

  const handleDownload = (downloadUrl) => {
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.click();
  };

  return (
    <div
      id={translation}
      className="one bg-gray-100 dark:bg-slate-700 shadow-md  hover:scale-[1.01] z-10 duration-100 cursor-pointer flex justify-between p-3 flex-wrap gap-3 "
    >
      <div className="flex gap-4 items-center ">
        <div className="w-10 h-10 bg-green-200 text-gray-900  dark:bg-green-800 border border-slate-500 flex justify-center items-center rotate-45 rounded-sm dark:text-white">
          <span className="-rotate-45 block text-center mt-[3px] rtl:me-[3px]">
            {number}
          </span>
        </div>

        <h2 className="surah-name font-semibold font-notoNaskhArabic text-gray-900 dark:text-slate-50">
          {currentLang == "en" ? `${translation} "${name}"` : `سورة ${name_ar}`}
        </h2>
      </div>
      <div className="buttons flex flex-col sm:flex-row justify-between items-center gap-2 text-gray-800 dark:text-white mx-auto sm:mx-0 w-full sm:w-fit">
        <Button
          text="listening"
          className="flex gap-1 px-5 py-3 w-full sm:w-[33%]  justify-center sm:justify-between"
          icon={listenIcon}
          handleSubmit={() => handleListening(url)}
        />
        <Button
          text="download"
          className="flex gap-1 px-5 py-3 w-full sm:w-[33%]  justify-center sm:justify-between"
          icon={downloadIcon}
          handleSubmit={() => handleDownload(downloadUrl)}
        />
        <Button
          text="share"
          className="flex gap-1 px-5 py-3 w-full sm:w-[33%]  justify-center sm:justify-between"
          icon={shareIcon}
          handleSubmit={() => handlePopup(`#${translation}`)}
        />
      </div>
    </div>
  );
};

export default SurahContainer;
