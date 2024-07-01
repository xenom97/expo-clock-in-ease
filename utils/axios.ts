import { useSecureStore } from "@/hooks/useSecureStore";
import axios from "axios";

const store = useSecureStore()

export const $axios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

$axios.interceptors.request.use(async (config) => {
  const token = await store.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})