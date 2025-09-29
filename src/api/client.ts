import { getApiUrl } from "@/config/api";
import axios from "axios";

let isRedirecting: boolean = false;

export const skoobApi = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "ngrok-skip-browser-warning": "uwu",
  },
});

skoobApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("INTERCEPTION ERROR", error);

    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
