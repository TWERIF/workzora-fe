import axios from "axios";

export const $api = axios.create({
  baseURL: `https://www.workzora.com/api/`, //`http://localhost:8000`
  timeout: 35000,
  headers: {'Content-Type': 'application/json'},
  withCredentials:true
});