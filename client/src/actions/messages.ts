import api, { CLIENT_URL } from "@/lib/Api";

export async function getMessages(page: number) {
  const response = await fetch(
    `${CLIENT_URL}/api/messages?currentPage=${page}`,
    {
      cache: "no-cache",
    }
  );

  const data = await response.json();
  return data;
}

export async function getUnReadMessages() {
  const response = await fetch(`${CLIENT_URL}/api/messages/unread`, {
    cache: "no-cache",
  });

  return response;
}

export async function deleteMessage(slug: string) {
  const { data } = await api.delete(`/api/messages/${slug}`);

  return data;
}

interface CreateMessageProps {
  senderName: string;
  senderEmail: string;
  content: string;
}

export const createMessage = async ({
  senderName,
  senderEmail,
  content,
}: CreateMessageProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await api.post(
    "/api/messages",
    { senderName, senderEmail, content },
    config
  );

  return data;
};
