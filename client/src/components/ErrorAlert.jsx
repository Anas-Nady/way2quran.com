import React from "react";

const ErrorAlert = ({ error }) => {
  return (
    <div className=" text-center my-5 flex justify-center items-start p-6 dark:bg-gray-900 bg-slate-50">
      <div
        className="p-4 mb-4 flex gap-2 justify-center items-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium ">{error}</span>
      </div>
    </div>
  );
};

export default ErrorAlert;
