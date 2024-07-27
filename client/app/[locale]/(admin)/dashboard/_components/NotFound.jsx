"use client";
export default function NotFound({ notFoundDataTxt }) {
  return (
    <span className="p-2 mt-2 text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-slate-50 bg-slate-200  dark:bg-gray-800">
      {notFoundDataTxt}
    </span>
  );
}
