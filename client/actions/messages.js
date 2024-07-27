import api, { baseURL } from "@/lib/api";

export async function getMessages(page) {
  const response = await fetch(`${baseURL}/api/messages?currentPage=${page}`, {
    cache: "no-cache",
  });

  const data = await response.json();
  return data;
}

export async function deleteMessage(slug) {
  const { data } = await api.delete(`/api/messages/${slug}`);

  return data;
}

export const createMessage = async ({ senderName, senderEmail, content }) => {
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
