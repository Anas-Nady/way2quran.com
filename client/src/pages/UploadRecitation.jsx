import React, { useEffect, useState } from "react";
import { Input } from "../components";
import { trashIcon } from "../components/Icons";

const UploadRecitation = () => {
  const [fileNames, setFileNames] = useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setFileNames([]);

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        console.log(`File ${file.name} uploaded successfully.`);
        // You can perform additional actions here if needed
        setFileNames((prevFileNames) => [...prevFileNames, file.name]);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {}, [fileNames]);

  return (
    <div className=" flex justify-center items-center">
      <form>
        <div className="flex justify-start gap-2 flex-col items-start">
          <select className="bg-gray-50 border  mb-2.5 h-fit p-3 w-[235px] border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected disabled value="" className="dark:bg-gray-900  ">
              Choose Type of Recitation
            </option>
            <option value="all-reicters" className="dark:bg-gray-900  ">
              ss
            </option>
            <option
              value="completed-recitations"
              className="dark:bg-gray-900  "
            >
              a
            </option>
            <option value="various-recitations" className="dark:bg-gray-900  ">
              as
            </option>
            <option value="topReciters" className="dark:bg-gray-900 ">
              to
            </option>
          </select>
          <select className="bg-gray-50 border  mb-2.5 h-fit p-3 w-[235px] border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected disabled value="" className="dark:bg-gray-900  ">
              Choose a Reciter
            </option>
            <option value="all-reicters" className="dark:bg-gray-900  ">
              a
            </option>
            <option
              value="completed-recitations"
              className="dark:bg-gray-900  "
            >
              a
            </option>
            <option value="various-recitations" className="dark:bg-gray-900  ">
              as
            </option>
            <option value="topReciters" className="dark:bg-gray-900 ">
              to
            </option>
          </select>

          <div>
            <input
              type="file"
              multiple
              id="audioFiles"
              className="bg-blue-500 rounded-sm p-2 w-[235px]"
              name="audioFiles"
              required
              onChange={handleFileUpload}
              accept="audio/*"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-orange-600 text-slate-50 p-2 rounded-sm my-4"
        >
          Upload now
        </button>
      </form>
    </div>
  );
};

export default UploadRecitation;
