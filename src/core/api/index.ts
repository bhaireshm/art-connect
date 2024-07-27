import axios from "axios";

const API = axios.create();

// Add a request interceptor
// Attach token
API.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// Add a response interceptor
API.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));

export { API };