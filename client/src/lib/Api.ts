import axios from "axios";
export const CLIENT_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: CLIENT_URL,
  timeout: 9_000_000,
});

export default api;
