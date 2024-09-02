"use client";

import { useRef, useState } from "react";
import TextAreaInput from "@/app/[locale]/(content)/contact-us/_TextAreaInput";
import { arrowUpRightIcon, closePopupIcon } from "@/components/Icons";
import getTextDirection from "@/utils/getTextDirection";
import getFontClass from "@/utils/getFontClass";
import ToastMessage from "@/components/ToastMessage";
import api from "@/lib/api";

export default function MessagePopup({ messageDetails, setSelectedMessage }) {
  const popupRef = useRef(null);
  const [sendMessageContent, setSendMessageContent] = useState("");
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);

  const [sendMessageState, setSendMessageState] = useState({
    success: false,
    toastMessage: "",
    error: false,
  });

  const resetSendMessageState = () => {
    setSendMessageState({
      success: false,
      toastMessage: "",
      error: false,
    });
  };

  const handleSendMessage = async () => {
    const body = {
      receiverEmail: messageDetails.email,
      content: sendMessageContent,
    };

    try {
      resetSendMessageState();
      setLoadingSendMessage(true);

      const res = await api.post("/api/messages/send-message", body);

      // Check if the response contains success data
      if (res.status === 200) {
        setSendMessageContent("");
        setSendMessageState({
          success: true,
          toastMessage: "Message sent successfully!",
          error: false,
        });
      } else {
        setSendMessageState({
          success: false,
          toastMessage: "Failed to send the message.",
          error: true,
        });
      }
    } catch (error) {
      setSendMessageState({
        success: false,
        toastMessage: "Failed to send the message.",
        error: true,
      });
    } finally {
      setLoadingSendMessage(false);
      setTimeout(() => {
        resetSendMessageState();
      }, 3000);
    }
  };

  if (!messageDetails.visible) return null;

  return (
    <>
      {sendMessageState.success && !sendMessageState.error && (
        <ToastMessage success={true} message={sendMessageState.toastMessage} />
      )}
      {sendMessageState.error && !sendMessageState.success && (
        <ToastMessage error={true} message={sendMessageState.toastMessage} />
      )}

      <div
        ref={popupRef}
        className="absolute mt-20 overflow-y-auto w-full h-full bg-slate-200 text-gray-900 dark:bg-gray-700 dark:text-slate-50 z-40 top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] transition-all"
      >
        <div>
          <div className="flex items-center justify-between p-4 border-b-2 border-gray-300 rounded-t md:p-5 dark:border-gray-600">
            <div>
              <h3
                className={`text-xl ${getFontClass(
                  messageDetails.username
                )} font-semibold capitalize text-gray-900 dark:text-white`}
              >
                {messageDetails.username}
              </h3>
              <span className="py-1 font-english">{messageDetails.email}</span>
            </div>
            <button
              onClick={() =>
                setSelectedMessage((prev) => ({ ...prev, visible: false }))
              }
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-900 bg-gray-100 border-2 border-gray-300 rounded-lg hover:bg-white ms-auto dark:bg-gray-600 dark:text-slate-50 dark:hover:bg-gray-700 dark:border-gray-500 dark:hover:text-white"
            >
              {closePopupIcon}
            </button>
          </div>
          <div className="p-4 space-y-4 md:p-5">
            <div
              dir={`${getTextDirection(messageDetails.messageContent)}`}
              className={`text-base leading-relaxed ${getFontClass(
                messageDetails.messageContent
              )}`}
              dangerouslySetInnerHTML={{
                __html: messageDetails.messageContent,
              }}
            />
          </div>
          <div className="flex items-center justify-start p-4 border-t-2 border-gray-300 dark:border-gray-600">
            <div className="flex items-center justify-center gap-1">
              <TextAreaInput
                name="message"
                rows={15}
                value={sendMessageContent}
                onChange={(e) => setSendMessageContent(e.target.value)}
              />
              <button
                type="button"
                disabled={loadingSendMessage}
                onClick={handleSendMessage}
                className={`${
                  loadingSendMessage && "cursor-not-allowed opacity-40"
                } flex items-center justify-center w-12 duration-200 dark:bg-gray-600 hover:bg-white dark:hover:bg-gray-700 border bg-gray-100 border-gray-300 dark:border-gray-500 dark:hover:border-gray-600 rounded h-[52px] mb-2`}
              >
                {arrowUpRightIcon}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
