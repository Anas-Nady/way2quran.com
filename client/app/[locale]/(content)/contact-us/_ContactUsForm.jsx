"use client";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import TextAreaInput from "./_TextAreaInput";
import Button from "@/components/Button";
import ToastMessage from "@/components/ToastMessage";
import { createMessage } from "@/actions/messages";

export default function ContactUsForm({
  labelName,
  labelEmail,
  labelTextarea,
  successCreatedMessageTxt,
  btnText,
}) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHappen, setErrorHappen] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorHappen(false);
    setSuccess(false);

    try {
      await createMessage({ senderName, senderEmail, content });
      setSuccess(true);
    } catch (err) {
      const currentError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      setErrorMessage(currentError);
      setErrorHappen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setSenderName("");
      setSenderEmail("");
      setContent("");
    }
  }, [success]);

  return (
    <>
      {errorHappen && <ToastMessage error={true} message={errorMessage} />}
      {success && (
        <ToastMessage success={true} message={successCreatedMessageTxt} />
      )}
      <form className="px-5 my-7" onSubmit={handleSendMessage}>
        <div className="mx-auto inputs">
          <Input
            labelText={labelName}
            id="senderName"
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
          <Input
            labelText={labelEmail}
            id="senderEmail"
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />

          <TextAreaInput
            name="message"
            value={content}
            label={labelTextarea}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex items-center justify-center">
            <Button disabled={loading} type="submit" text={btnText} />
          </div>
        </div>
      </form>
    </>
  );
}
