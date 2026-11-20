import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { getCookie, setCookie, removeCookie } from "../utils/cookies";
import { getNewTokens } from "../services/token";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
let refreshPromise = null;

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshRequest = originalRequest?.url?.includes(
      "/auth/check-refresh-token",
    );

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      isRefreshRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = getNewTokens()
          .then((res) => {
            if (!res?.response) {
              throw res?.error || error;
            }

            setCookie(res.response.data);
            return res.response.data;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return api(originalRequest);
    } catch (refreshError) {
      const status = refreshError?.response?.status;

      if (status === 401 || status === 403) {
        removeCookie();
      }

      return Promise.reject(refreshError);
    }
  },
);

export default api;
