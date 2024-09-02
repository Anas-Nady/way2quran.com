"use client";
import ToastMessage from "@/components/ToastMessage";
import Image from "next/image";
import { useState } from "react";

function QuranList({ quran, quranName }) {
  const [toast, setToast] = useState({ message: "", type: "", error: false });

  const handleDownload = async (pdfName, downloadLink) => {
    setToast({ message: "Tracking download...", error: false });
    try {
      // Track the download
      const trackResponse = await fetch(`/api/download/quran/${pdfName}`, {
        method: "GET",
      });

      if (!trackResponse.ok) {
        throw new Error("Failed to track download.");
      }

      // Open the download link
      window.open(downloadLink, "_blank");
    } catch (error) {
      setToast({
        message: error.message || "An error occurred. Please try again later.",
        error: true,
      });
    }
  };

  return (
    <>
      {toast.error && <ToastMessage error={true} message={toast.message} />}
      <button
        type="button"
        onClick={() => handleDownload(quran.slug, quran.downloadLink)}
        title={quranName}
        key={quran.id}
        className="flex p-2 flex-col mt-2 duration-300 border cursor-pointer hover:scale-[1.01] hover:-translate-y-1 quran-pdf dark:border-gray-700"
      >
        <div className="flex justify-center flex-1 overflow-hidden duration-200">
          <Image
            src={quran.img}
            className="object-cover w-[367px] h-[538px]"
            alt={quranName}
            width={600}
            height={600}
            loading="lazy"
          />
        </div>
        <div className="flex items-center justify-between gap-1 px-1.5 py-2 text-gray-700 bg-gray-300 dark:bg-gray-600 dark:text-white">
          <h3 className="font-semibold text-center line-clamp-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl">
            {quranName}
          </h3>
        </div>
      </button>
    </>
  );
}

export default QuranList;
