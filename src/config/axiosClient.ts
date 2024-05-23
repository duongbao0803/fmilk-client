import { requestRefreshToken } from "@/api/authenApi";
import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "https://fmilk-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const access_token = Cookies.get("accessToken");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      error.response?.data?.errorType === "invalid_token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      try {
        if (refreshToken) {
          const res = await requestRefreshToken(refreshToken);
          if (res && res.status === 200) {
            const data = res.data;
            Cookies.set("accessToken", data.accessToken);
            axiosClient.defaults.headers.common["Authorization"] =
              `Bearer ${data.accessToken}`;
          }
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("check refresh error", refreshError);
        // return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
