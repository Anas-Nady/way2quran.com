import React from "react";
import { Button, ImgReciter, Select } from "./../components";
import { starIcon } from "./Icons";
import { useTranslation } from "react-i18next";

const ReciterInfoCard = ({
  reciterName,
  handlePopup,
  reciterInfo,
  recitationsInfo,
  selectedRecitationType,
  changeSelectedRecitation,
}) => {
  const { t, i18n } = useTranslation();

  const handleDownloadAllFiles = (reciterSlug, recitationSlug) => {
    const a = document.createElement("a");
    const baseURL = `${window.location.origin}/api/reciters/download/${reciterSlug}/${recitationSlug}`;
    a.setAttribute("href", baseURL);
    a.click();
  };

  return (
    <>
      <div className="my-2 sm:my-5 flex flex-col sm:flex-row m-auto gap-4 h-fit">
        <div className="img-reciter block rounded-full mx-auto">
          <ImgReciter
            photoDisplay={reciterInfo.photo}
            alt={reciterName}
            isBigger={true}
          />
        </div>
        <div className="info-reciter flex-col sm:flex-row gap-1 sm:flex-1 max-w-[100%] flex  sm:justify-between">
          <div className="data-reciter flex items-center sm:items-start lg:items-center w-full mx-auto mt-[-10px] sm:my-2  flex-col">
            <h1 className="my-1 sm:my-3 capitalize text-3xl   xl:text-5xl text-gray-900 dark:text-white font-semibold">
              {reciterName}
            </h1>
            <div className="text-white flex gap-1 items-center mb-2">
              {reciterInfo.topReciter && (
                <>
                  <span className="text-yellow-300">{starIcon}</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-slate-50">
                    {t("topReciters")}
                  </span>
                </>
              )}
            </div>

            <Select
              options={recitationsInfo}
              value={selectedRecitationType}
              onChange={changeSelectedRecitation}
            />
          </div>

          <div className="flex flex-col justify-between sm:items-center gap-2 my-2 sm:my-12">
            <Button
              text="downloadAll"
              className="p-2 w-[100px] sm:w-32"
              handleSubmit={() =>
                handleDownloadAllFiles(reciterInfo.slug, selectedRecitationType)
              }
            />

            <Button
              text="share"
              handleSubmit={() => handlePopup("")}
              className="p-2 w-[90px] sm:w-32"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReciterInfoCard;
