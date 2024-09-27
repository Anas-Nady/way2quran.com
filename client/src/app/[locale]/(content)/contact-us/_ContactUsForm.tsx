"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ToastMessage from "@/components/ui/ToastMessage";
import { createMessage } from "@/actions/messages";
import TextAreaInput from "@/components/ui/TextAreaInput";
import getErrorMessage from "@/helpers/getErrorMessage";

export default function ContactUsForm() {
  const t = useTranslations("ContactUsPage");

  const translations = {
    labelEmail: t("email"),
    labelName: t("name"),
    labelTextarea: t("textarea"),
    sendMessage: t("sendMessageBtn"),
    successCreatedMessage: t("successCreatedMessage"),
  };

  const [formState, setFormState] = useState({
    loading: false,
    error: "",
    success: false,
    senderName: "",
    senderEmail: "",
    content: "",
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({
      ...prev,
      loading: true,
      error: "",
      success: false,
    }));

    try {
      await createMessage({
        senderName: formState.senderName,
        senderEmail: formState.senderEmail,
        content: formState.content,
      });
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        senderName: "",
        senderEmail: "",
        content: "",
      }));
    } catch (err: unknown) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: getErrorMessage(err),
      }));
    }
  };

  return (
    <>
      {formState.error && (
        <ToastMessage error={true} message={formState.error} />
      )}
      {formState.success && (
        <ToastMessage
          success={true}
          message={translations.successCreatedMessage}
        />
      )}
      <form className="px-5" onSubmit={handleSendMessage}>
        <div className="mx-auto inputs">
          <Input
            labelText={translations.labelName}
            id="senderName"
            type="text"
            value={formState.senderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormState((prev) => ({ ...prev, senderName: e.target.value }))
            }
          />
          <Input
            labelText={translations.labelEmail}
            id="senderEmail"
            type="email"
            value={formState.senderEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormState((prev) => ({ ...prev, senderEmail: e.target.value }))
            }
          />

          <TextAreaInput
            id="message"
            name="message"
            value={formState.content}
            label={translations.labelTextarea}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormState((prev) => ({ ...prev, content: e.target.value }))
            }
          />

          <div className="flex items-center justify-center">
            <Button disabled={formState.loading} type="submit">
              {translations.sendMessage}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
