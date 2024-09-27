import api from "@/lib/Api";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
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
