import api from "@/lib/api";

export const login = async ({ email, password }) => {
  const { data } = await api.post("/api/auth/login", {
    email,
    password,
  });

  api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  return data;
};

export const logout = async () => {
  await api.get(`/api/auth/logout`);
};
