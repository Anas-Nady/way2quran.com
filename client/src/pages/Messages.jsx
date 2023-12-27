import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, listMessages } from "../redux/actions/messageAction";
import { toast } from "react-toastify";
import {
  deleteMessageReset,
  listMessagesReset,
} from "../redux/slices/messageSlice";
import { trashIcon } from "../components/Icons";
import { useTranslation } from "react-i18next";
import { Spinner, ErrorAlert, NotFoundData, Pagination } from "../components";

const Messages = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { loading, messages, pagination, error } = useSelector(
    (state) => state.listMessages
  );

  const {
    loading: loadingDeleteMessage,
    success: successDeletedMessage,
    error: errorDeletedMessage,
  } = useSelector((state) => state.deleteMessage);

  const currentLang = i18n.language;
  const handlePosition = currentLang == "ar" ? "left-1" : "right-1";

  const handleDisabledDate = (messageDate) => {
    const date = new Date(messageDate);
    const formattedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
    return formattedDate;
  };

  const handleDeleteMessage = (slug) => {
    dispatch(deleteMessage(slug));
  };

  useEffect(() => {
    dispatch(listMessages());

    if (successDeletedMessage) {
      toast.success("Deleted message successfully");
    } else if (errorDeletedMessage) {
      toast.error(errorDeletedMessage);
    }
    dispatch(deleteMessageReset());
    dispatch(listMessagesReset());
  }, [dispatch, successDeletedMessage, errorDeletedMessage]);

  return (
    <div className=" border-slate-100 dark:border-red-950">
      <div className="min-h-screen ">
        <div className="flex justify-center items-center gap-2 flex-wrap ">
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorAlert error={error} />
          ) : messages && messages.length === 0 ? (
            <NotFoundData />
          ) : (
            messages.map((message, i) => (
              <div
                key={i}
                className="message relative w-[400px] h-[200px] overflow-hidden hover:line-clamp-none  hover:overflow-y-auto bg-slate-200  dark:bg-gray-700 p-3 rounded-sm border-s-4 border-slate-300 dark:border-gray-600 hover:scale-[1.01] cursor-default"
              >
                <button
                  className={`absolute top-2 cursor-pointer hover:text-red-600 duration-150 ${handlePosition} ${
                    loadingDeleteMessage && "cursor-not-allowed"
                  }`}
                  onClick={() => handleDeleteMessage(message.slug)}
                  disabled={loadingDeleteMessage}
                  title="delete"
                >
                  {trashIcon}
                </button>
                <h2>
                  {t("name")}: {message.name}
                </h2>
                <span>
                  {t("email")}: {message.email}
                </span>
                <span className="border border-b-1 border-slate-300 dark:border-gray-600 my-1 block w-full"></span>
                <p className="line-clamp-3 hover:line-clamp-none leading-7 tracking-wide min-h-[84px]">
                  {message.content}
                </p>
                <p
                  className={`rtl:text-end text-start bg-slate-300 w-fit dark:bg-gray-600 dark:text-white text-gray-900  my-1 p-1 rounded-md `}
                >
                  {handleDisabledDate(message.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Pagination
        currentPage={pagination.page || 0}
        totalPages={pagination.pages || 0}
      />
    </div>
  );
};

export default Messages;
