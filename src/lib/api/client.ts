import { getApiUrl } from "@/config/api";
import axios from "axios";

export const skoobApi = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "ngrok-skip-browser-warning": "uwu",
  },
});
