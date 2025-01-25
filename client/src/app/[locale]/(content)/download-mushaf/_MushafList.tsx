"use client";
import React, { useState } from "react";
import ToastMessage from "@/components/ui/ToastMessage";
import getErrorMessage from "@/helpers/getErrorMessage";
import Image from "next/image";

interface ToastType {
  message: string;
  type?: string;
  error: boolean;
}

interface MushafListProps {
  quran: {
    arabicName: string;
    englishName: string;
    slug: string;
    downloadURL: string;
    imageURL: string;
  };
  quranName: string;
}

const MushafList: React.FC<MushafListProps> = ({ quran, quranName }) => {
  const [toast, setToast] = useState<ToastType>({
    message: "",
    type: "",
    error: false,
  });

  const handleDownload = async (
    slug: string,
    downloadLink: string
  ): Promise<void> => {
    setToast({ message: "Tracking download...", error: false });
    try {
      window.location.href = downloadLink;

      await fetch(`/api/mushaf/increment/${slug}`, {
        method: "POST",
      });
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
        onClick={() => handleDownload(quran.slug, quran.downloadURL)}
        title={quranName}
        key={quran.slug}
        className="flex p-2 flex-col mt-2 duration-300 border cursor-pointer hover:scale-[1.01] hover:-translate-y-1 quran-pdf dark:border-gray-700"
      >
        <div className="flex justify-center flex-1 overflow-hidden duration-200">
          <Image
            src={quran.imageURL}
            className="object-cover w-[367px] h-[538px]"
            alt={quranName}
            width={600}
            height={600}
            priority
          />
        </div>
        <h3 className="py-2 text-lg w-full font-semibold text-center text-gray-700 bg-gray-300 line-clamp-1 dark:bg-gray-600 md:text-xl xl:text-2xl dark:text-white">
          {quranName}
        </h3>
      </button>
    </>
  );
};

export default MushafList;
