import axios from "axios";

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5005";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type ApiEnvelope<T> = { success: boolean; message: string; data: T };

export async function apiPost<TData, TBody = unknown>(path: string, body: TBody, config?: any) {
  const res = await api.post<ApiEnvelope<TData>>(path, body, config);
  return res.data;
}

export async function apiGet<TData>(path: string, config?: any) {
  const res = await api.get<ApiEnvelope<TData>>(path, config);
  return res.data;
}

