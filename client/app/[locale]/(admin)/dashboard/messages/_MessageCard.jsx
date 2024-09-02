import { deleteMessage } from "@/actions/messages";
import { trashIcon } from "@/components/Icons";
import getFontClass from "@/utils/getFontClass";
import getTextDirection from "@/utils/getTextDirection";

export default function MessageCard({
  handlePopupMessage,
  message,
  translations,
  setErrorState,
  loadingState,
  setLoadingState,
}) {
  const handleTrashIconPosition =
    translations.currentLang == "ar" ? "left-1" : "right-1";

  const handleDeleteMessage = async (e, messageSlug) => {
    e.stopPropagation(); // Prevent event propagation

    const result = confirm(translations.confirmDeleteTxt);

    if (result) {
      setErrorState({ errorHappen: false, errorMessage: "" });
      setLoadingState((prev) => ({ ...prev, deleteMessageLoading: true }));
      try {
        await deleteMessage(messageSlug);
      } catch (err) {
        const errorMessage =
          err.response && err.response?.data.message
            ? err.response?.data?.message
            : err.message;
        setErrorState({
          errorHappen: true,
          errorMessage: errorMessage || "An error occurred during login.",
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
        {translations.nameTxt}:
        <span className={`${getFontClass(message.senderName)}`}>
          {" "}
          {message.senderName}
        </span>
      </h2>
      <span>
        {translations.emailTxt}:
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
}
