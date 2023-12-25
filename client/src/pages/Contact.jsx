import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Heading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../redux/actions/messageAction";
import { createMessageReset } from "../redux/slices/messageSlice";
import { toast } from "react-toastify";

function Contact() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.createMessage
  );

  const handleSendMessage = (e) => {
    e.preventDefault();

    dispatch(createMessage(name, email, content));
  };

  useEffect(() => {
    if (success) {
      toast.success("we received your message successfully");
      setName("");
      setEmail("");
      setContent("");
    }
    if (error) {
      toast.error(error);
    }
    dispatch(createMessageReset());
  }, [success, error, dispatch]);

  return (
    <div className="container max-w-xl min-h-[75vh]">
      <div>
        <Heading sectionTitle={t("contactTitle")} />
        <p className="text-center mt-3 text-gray-500 dark:text-white ">
          {t("contactDescription")}
        </p>

        <form className="my-7 ">
          <div className="inputs  mx-auto">
            <Input
              labelText="nameInput"
              placeholder="namePlaceholder"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              labelText="emailInput"
              placeholder="emailPlaceholder"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="mb-5 max-w-full">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("textarea")}
              </label>
              <textarea
                id="message"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("textareaPlaceholder")}
              ></textarea>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={loading}
                className={`text-white bg-orange-600 hover:bg-orange-700 ${
                  loading && "cursor-not-allowed"
                } duration-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
              >
                {t("sendMessageBtn")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
