"use client";
import ToastMessage from "@/components/ui/ToastMessage";
import getErrorMessage from "@/helpers/getErrorMessage";
import Image from "next/image";
import React, { useState } from "react";

interface ToastType {
  message: string;
  type?: string;
  error: boolean;
}

interface QuranListProps {
  quran: {
    id: number;
    arabicName: string;
    englishName: string;
    slug: string;
    img: string;
    downloadLink: string;
  };
  quranName: string;
}

const QuranList: React.FC<QuranListProps> = ({ quran, quranName }) => {
  const [toast, setToast] = useState<ToastType>({
    message: "",
    type: "",
    error: false,
  });

  const handleDownload = async (
    pdfName: string,
    downloadLink: string
  ): Promise<void> => {
    setToast({ message: "Tracking download...", error: false });
    try {
      await fetch(`/api/download/quran/${pdfName}`, {
        method: "GET",
      });

      window.location.href = downloadLink;
    } catch (err: unknown) {
      setToast({
        message: getErrorMessage(err),
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
            priority
          />
        </div>
        <h3 className="py-2 text-lg font-semibold text-center text-gray-700 bg-gray-300 line-clamp-1 dark:bg-gray-600 md:text-xl xl:text-2xl dark:text-white">
          {quranName}
        </h3>
      </button>
    </>
  );
};

export default QuranList;
