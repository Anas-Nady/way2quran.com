"use client";

import Pagination from "@/components/Pagination";
import ToastMessage from "@/components/ToastMessage";
import { getMessages } from "@/actions/messages";
import { useEffect, useRef, useState } from "react";
import NotFound from "../_components/NotFound";

import LoadingSpinner from "@/components/LoadingSpinner";
import MessagePopup from "./_MessagePopup";
import MessageCard from "./_MessageCard";

export default function MessageList({
  nameTxt,
  emailTxt,
  confirmDeleteTxt,
  notFoundDataTxt,
  currentLang,
  searchParams,
}) {
  const popupRef = useRef(null);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const [errorState, setErrorState] = useState({
    errorHappen: false,
    errorMessage: "",
  });
  const [loadingState, setLoadingState] = useState({
    loadingMessages: true,
    deleteMessageLoading: false,
  });

  const [selectedMessage, setSelectedMessage] = useState({
    visible: false,
    username: "",
    email: "",
    messageContent: "",
  });
  const currentPage = searchParams?.currentPage || 1;

  const handlePopupMessage = (name, email, content) => {
    setSelectedMessage({
      visible: true,
      username: name,
      email,
      messageContent: content,
    });
  };

  const fetchData = async () => {
    setLoadingState((prev) => ({ ...prev, loadingMessages: true }));

    try {
      const { messages, pagination } = await getMessages(currentPage);
      setData(messages);
      setPagination(pagination);
    } finally {
      setLoadingState((prev) => ({ ...prev, loadingMessages: false }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedMessage((prev) => ({ ...prev, visible: false }));
      }
    };
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedMessage((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, loadingState.deleteMessageLoading]);

  if (loadingState.loadingMessages) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <MessagePopup
        messageDetails={selectedMessage}
        setSelectedMessage={setSelectedMessage}
      />
      {errorState.errorHappen && (
        <ToastMessage error={true} message={errorState.errorMessage} />
      )}

      {!loadingState.loadingMessages && (
        <>
          <div className="relative min-h-screen">
            <div className="flex flex-wrap items-center justify-center gap-2 ">
              {data.length > 0 &&
                data?.map((message) => (
                  <MessageCard
                    handlePopupMessage={handlePopupMessage}
                    message={message}
                    loadingState={loadingState}
                    setLoadingState={setLoadingState}
                    setErrorState={setErrorState}
                    translations={{
                      nameTxt,
                      emailTxt,
                      confirmDeleteTxt,
                      currentLang,
                    }}
                    key={message.slug}
                  />
                ))}
              {data?.length == 0 && (
                <NotFound notFoundDataTxt={notFoundDataTxt} />
              )}
            </div>
          </div>
          <Pagination
            currentPage={pagination?.page || 0}
            totalPages={pagination?.pages || 0}
          />
        </>
      )}
    </>
  );
}
