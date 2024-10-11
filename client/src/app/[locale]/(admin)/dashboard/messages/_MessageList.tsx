"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getMessages } from "@/actions/messages";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MessagePopup from "./_MessagePopup";
import MessageCard from "./_MessageCard";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import ToastMessage from "@/components/ui/ToastMessage";

export type LoadingState = {
  deleteMessageLoading?: boolean;
  loadingMessages: boolean;
};

export type ErrorState = {
  errorHappen: boolean;
  errorMessage: string;
};

type MessageListProps = LocaleProps & {
  searchParams: SearchParams;
};

const MessageList: React.FC<MessageListProps> = ({ locale, searchParams }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<UserMessage[]>([]);
  const [pagination, setPagination] = useState<PaginationDetails>({
    currentPage: 1,
    totalPages: 1,
  });

  const [errorState, setErrorState] = useState<ErrorState>({
    errorHappen: false,
    errorMessage: "",
  });
  const [loadingState, setLoadingState] = useState<LoadingState>({
    loadingMessages: true,
    deleteMessageLoading: false,
  });

  const [selectedMessage, setSelectedMessage] = useState<UserPopupMessage>({
    visible: false,
    username: "",
    email: "",
    messageContent: "",
  });
  const currentPage = searchParams?.currentPage || 1;

  const handlePopupMessage = (name: string, email: string, content: string) => {
    setSelectedMessage({
      visible: true,
      username: name,
      email,
      messageContent: content,
    });
  };

  const fetchData = useCallback(async () => {
    setLoadingState((prev) => ({ ...prev, loadingMessages: true }));

    try {
      const { messages, pagination } = await getMessages(currentPage);
      setData(messages);
      setPagination({
        currentPage: pagination.page,
        totalPages: pagination.pages,
      });
    } catch (error: unknown) {
      let errorMessage = "An error occurred while fetching messages.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrorState({
        errorHappen: true,
        errorMessage,
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, loadingMessages: false }));
    }
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMessage((prev) => ({ ...prev, visible: false }));
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current?.contains(event.target as Node)
      ) {
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
  }, [fetchData, loadingState.deleteMessageLoading]);

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
        <ToastMessage error={true} message={errorState?.errorMessage ?? ""} />
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
                    key={message.slug}
                    locale={locale}
                  />
                ))}
              {data?.length == 0 && <EmptyState />}
            </div>
          </div>
          <Pagination
            currentPage={pagination?.currentPage || 0}
            totalPages={pagination?.totalPages || 0}
          />
        </>
      )}
    </>
  );
};

export default MessageList;
