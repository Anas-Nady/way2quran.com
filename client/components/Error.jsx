"use client";

import getFontClass from "@/utils/getFontClass";
import getTextDirection from "@/utils/getTextDirection";
import Link from "next/link";

export default function Error({ message }) {
  return (
    <div
      className="min-h-screen max-w-[900px] flex  items-center flex-col gap-4 mx-auto"
      dir={getTextDirection(message)}
    >
      <div className="flex min-w-[300px] flex-col items-center gap-5 px-4 my-32 bg-red-600 rounded shadow-md shadow-red-700 dark:bg-red-700 py-9">
        <h3 className="text-lg text-center text-white">
          <p
            className={`text-lg font-medium sm:text-xl xl:text-2xl ${getFontClass(
              message
            )}`}
          >
            {message}
          </p>
        </h3>
        <Link
          href="/"
          className="px-3 py-2 font-bold text-red-500 duration-200 bg-white rounded-lg hover:bg-gray-200 font-english"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
