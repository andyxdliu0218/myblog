import axios from "axios";

const url = "";

const req = axios.create({
  baseURL: url,
  timeout: 5000,
});

// request interceptor
req.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
req.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { req };
