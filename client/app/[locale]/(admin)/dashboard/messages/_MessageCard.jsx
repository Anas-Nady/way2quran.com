"use client";

import Pagination from "@/components/Pagination";
import ToastMessage from "@/components/ToastMessage";
import { deleteMessage, getMessages } from "@/actions/messages";
import { useEffect, useRef, useState } from "react";
import NotFound from "../_components/NotFound";

import { closePopupIcon, trashIcon } from "@/components/Icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import getTextDirection from "@/utils/getTextDirection";
import getFontClass from "@/utils/getFontClass";

export default function MessageCard({
  nameTxt,
  emailTxt,
  pageTxt,
  ofTxt,
  notFoundDataTxt,
  currentLang,
  confirmDeleteTxt,
  searchParams,
}) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [errorHappen, setErrorHappen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteMessageLoading, setDeleteMessageLoading] = useState(false);
  const popupRef = useRef(null);

  const [loadingMessages, setLoadingMessages] = useState(true);

  const handleTrashIconPosition = currentLang == "ar" ? "left-1" : "right-1";

  const [popupStatus, setPopupStatus] = useState(false);
  const [popupUsername, setPopupUsername] = useState("");
  const [popupEmail, setPopupEmail] = useState("");
  const [popupMessageContent, setPopupMessageContent] = useState("");
  const currentPage = searchParams?.currentPage || 1;

  const handlePopupMessage = (name, email, content) => {
    setPopupUsername(name);
    setPopupEmail(email);
    setPopupMessageContent(content);

    setPopupStatus(true);
  };

  const handleDeleteMessage = async (e, messageSlug) => {
    e.stopPropagation(); // Prevent event propagation

    const result = confirm(confirmDeleteTxt);

    if (result) {
      setErrorMessage(false);
      setDeleteMessageLoading(true);
      try {
        await deleteMessage(messageSlug);
      } catch (err) {
        const errorMessage =
          err.response && err.response?.data.message
            ? err.response?.data?.message
            : err.message;
        setErrorHappen(errorMessage || "An error occurred during login.");
        setErrorMessage(true);
      } finally {
        setDeleteMessageLoading(false);
      }
    } else return;
  };

  const fetchData = async () => {
    setLoadingMessages(true);
    try {
      const { messages, pagination } = await getMessages(currentPage);
      setData(messages);
      setPagination(pagination);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPopupStatus(false);
      }
    };
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupStatus(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popupStatus]);

  useEffect(() => {
    fetchData();
  }, [currentPage, deleteMessageLoading]);

  if (loadingMessages) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {popupStatus && (
        <div
          ref={popupRef}
          className="absolute mt-20 overflow-y-auto w-full h-full bg-slate-200 text-gray-900 dark:bg-gray-700 dark:text-slate-50 z-50 top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] transition-all"
        >
          <div>
            <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
              <div>
                <h3
                  className={`text-xl ${getFontClass(
                    popupUsername
                  )} font-semibold capitalize text-gray-900 dark:text-white`}
                >
                  {popupUsername}
                </h3>
                <span className="py-1 font-english">{popupEmail}</span>
              </div>
              <button
                onClick={() => setPopupStatus(false)}
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-900 bg-gray-400 rounded-lg ms-auto dark:bg-gray-600 dark:text-slate-50 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {closePopupIcon}
              </button>
            </div>
            <div className="p-4 space-y-4 md:p-5">
              <div
                dir={`${getTextDirection(popupMessageContent)}`}
                className={`text-base leading-relaxed ${getFontClass(
                  popupMessageContent
                )}`}
                dangerouslySetInnerHTML={{ __html: popupMessageContent }}
              />
            </div>
          </div>
        </div>
      )}

      {errorHappen && <ToastMessage error={true} message={errorMessage} />}
      {!loadingMessages && (
        <>
          <div className="relative min-h-screen">
            <div className="flex flex-wrap items-center justify-center gap-2 ">
              {data.length > 0 &&
                data?.map((message, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handlePopupMessage(
                        message.senderName,
                        message.senderEmail,
                        message.content
                      )
                    }
                    className={`message cursor-pointer relative w-[400px] h-[200px] md:w-[600px] md:h-[300px] overflow-hidden hover:line-clamp-none  hover:overflow-y-auto no-overflow-style bg-slate-200  dark:bg-gray-700 p-3 rounded-sm border-s-4 ${
                      !message.isRead
                        ? "border-green-400 dark:border-green-600"
                        : "border-slate-300 dark:border-gray-600"
                    } hover:scale-[1.01] cursor-default`}
                  >
                    <button
                      className={`absolute ${
                        deleteMessageLoading && "opacity-40 cursor-not-allowed"
                      } top-2 cursor-pointer hover:text-red-600 duration-150 ${handleTrashIconPosition}`}
                      onClick={(e) => handleDeleteMessage(e, message.slug)}
                      title="delete"
                      disabled={deleteMessageLoading}
                    >
                      {trashIcon}
                    </button>
                    <h2>
                      {nameTxt}:
                      <span className={`${getFontClass(message.senderName)} `}>
                        {" "}
                        {message.senderName}
                      </span>
                    </h2>
                    <span>
                      {emailTxt}:
                      <span className="font-english">
                        {" "}
                        {message.senderEmail}
                      </span>
                    </span>
                    <span className="block w-full my-1 border border-b-1 border-slate-300 dark:border-gray-600"></span>

                    <div
                      dir={`${getTextDirection(message.content)}`}
                      className={`leading-7 tracking-wide min-h-[84px] ${getFontClass(
                        message.content
                      )}`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                ))}
              {data?.length == 0 && (
                <NotFound notFoundDataTxt={notFoundDataTxt} />
              )}
            </div>
          </div>
          <Pagination
            currentPage={pagination?.page || 0}
            totalPages={pagination?.pages || 0}
            pageTxt={pageTxt}
            ofTxt={ofTxt}
          />
        </>
      )}
    </>
  );
}
