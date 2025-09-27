import { getApiUrl } from "@/config/api";
import axios from "axios";

export const skoobApi = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "ngrok-skip-browser-warning": "uwu",
  },
});
