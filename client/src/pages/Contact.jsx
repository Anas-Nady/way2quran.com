import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Heading,
  HelmetConfig,
  Button,
  Layout,
  TextAreaInput,
} from "../components";
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
      toast.success(t("successCreatedMessage"));
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
    <>
      <HelmetConfig title={t("contactTitle")} />
      <Layout>
        <div className="my-10">
          <Heading sectionTitle={t("contactTitle")} />
          <div className="container max-w-lg min-h-[80vh]">
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

                <TextAreaInput
                  name="message"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <div className="flex justify-center items-center">
                  <Button
                    handleSubmit={handleSendMessage}
                    text="sendMessageBtn"
                    disabled={loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Contact;
