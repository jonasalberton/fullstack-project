import { HttpError } from "@/models/Http";
import axios from "axios";
const DOMAIN = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error): Promise<HttpError> => {
    if (error.isAxiosError && error.response) {
      return Promise.reject({
        message:
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data?.message || "An error occurred on the server",
        status: error.response.status,
      });
    }

    return Promise.reject({
      message: error.message,
      status: error.response.status,
    });
  }
);

export { axiosInstance as axios };
