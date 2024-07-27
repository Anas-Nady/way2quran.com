import api from "@/lib/api";

export const getUserProfile = async () => {
  const { data } = await api.get(`/api/auth/get-profile`);
  return data;
};

export const updateUserProfile = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await api.put(
    "/api/auth/update-profile",
    { email, password },
    config
  );

  return data;
};
