import axios from "axios";
export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  timeout: 9_000_000,
});

export default api;
