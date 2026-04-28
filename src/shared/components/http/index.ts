import axios from "axios";

export const $api = axios.create({
  baseURL: `https://workzora.com/api`,
  timeout: 35000,
  headers: {'Content-Type': 'application/json'},
  withCredentials:true
});