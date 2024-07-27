import axios from "axios";

const API = axios.create();

// Add a request interceptor
API.interceptors.request.use((config) =>
  // Attach token
  config
  , (error) => Promise.reject(error));

// Add a response interceptor
API.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export { API };