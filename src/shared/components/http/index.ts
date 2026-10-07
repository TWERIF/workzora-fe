import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://workzora.com/api";

export const $api = axios.create({
  baseURL: API_URL,
  timeout: 35000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
