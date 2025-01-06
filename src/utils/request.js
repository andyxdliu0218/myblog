import axios from "axios";
import { getToken } from "./token";

const url = "http://localhost:8080/user";

const req = axios.create({
  baseURL: url,
  timeout: 5000,
});

// request interceptor
req.interceptors.request.use(
  (config) => {
    // set token into header 1. get token  2. set token to header by presetted rule
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Authorization = token;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
req.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { req };
