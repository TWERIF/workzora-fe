import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://workzora.com/api";

const isServer = typeof window === "undefined";

export const $api = axios.create({
  baseURL: isServer ? process.env.API_INTERNAL_URL || API_URL : API_URL,
  timeout: 35000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
