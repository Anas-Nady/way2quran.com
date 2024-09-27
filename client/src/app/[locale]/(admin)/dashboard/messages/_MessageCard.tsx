import { deleteMessage } from "@/actions/messages";
import { trashIcon } from "@/components/Icons";
import getFontClass from "@/helpers/getFontClass";
import getTextDirection from "@/helpers/getTextDirection";
import { LocaleProps, UserMessage } from "@/types/types";
import { useTranslations } from "next-intl";
import React from "react";
import { ErrorState, LoadingState } from "./_MessageList";
import getErrorMessage from "@/helpers/getErrorMessage";

type MessageCardProps = LocaleProps & {
  handlePopupMessage: (name: string, email: string, content: string) => void;
  message: UserMessage;
  setErrorState: React.Dispatch<React.SetStateAction<ErrorState>>;
  loadingState: LoadingState;
  setLoadingState: React.Dispatch<React.SetStateAction<LoadingState>>;
};

const MessageCard: React.FC<MessageCardProps> = ({
  handlePopupMessage,
  message,
  locale,
  setErrorState,
  loadingState,
  setLoadingState,
}) => {
  const t = useTranslations("MessagesPage");
  const handleTrashIconPosition = locale == "ar" ? "left-1" : "right-1";

  const handleDeleteMessage = async (
    e: React.MouseEvent<HTMLButtonElement>,
    messageSlug: string
  ) => {
    e.stopPropagation(); // Prevent event propagation

    const result = confirm(t("confirmDelete"));

    if (result) {
      setErrorState({ errorHappen: false, errorMessage: "" });
      setLoadingState((prev) => ({ ...prev, deleteMessageLoading: true }));
      try {
        await deleteMessage(messageSlug);
      } catch (err: unknown) {
        setErrorState({
          errorHappen: true,
          errorMessage: getErrorMessage(err),
        });
      } finally {
        setLoadingState((prev) => ({ ...prev, deleteMessageLoading: false }));
      }
    } else return;
  };

  return (
    <div
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
          loadingState.deleteMessageLoading && "opacity-40 cursor-not-allowed"
        } top-2 cursor-pointer hover:text-red-600 duration-150 ${handleTrashIconPosition}`}
        onClick={(e) => handleDeleteMessage(e, message.slug)}
        title="delete"
        disabled={loadingState.deleteMessageLoading}
      >
        {trashIcon}
      </button>
      <h2>
        {t("name")}:
        <span className={`${getFontClass(message.senderName)}`}>
          {" "}
          {message.senderName}
        </span>
      </h2>
      <span>
        {t("email")}:
        <span className="font-english"> {message.senderEmail}</span>
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
  );
};

export default MessageCard;
