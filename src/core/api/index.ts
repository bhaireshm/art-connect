import { COOKIE, ROUTES } from "@/utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";

const API = axios.create();

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    // Get the token from the cookie
    const token = getCookie(COOKIE.name);

    // If token exists, add it to the headers
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (!config.headers.getContentType()) config.headers.setContentType("application/json");

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Try a different method of Clear the token and redirect to login
      document.cookie = `${COOKIE.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      window.location.href = ROUTES.LOGIN.path;
    }
    return Promise.reject(error);
  }
);

export { API };

