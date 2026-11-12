import axios from "axios";

export const httpClient = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api", headers: { "Content-Type": "application/json" } });

httpClient.interceptors.request.use((request) => {
  const token = localStorage.getItem("access_token");
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});
