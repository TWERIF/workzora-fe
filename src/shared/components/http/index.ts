import axios from "axios";

// Set NEXT_PUBLIC_API_URL in .env.local (dev) or in the build environment (prod).
// Without it the production API is used.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://workzora.com/api";

export const $api = axios.create({
  baseURL: API_URL,
  timeout: 35000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
