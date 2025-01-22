import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";
import { loginUrl, baseURL } from "./url";

// create axios instance

const req = axios.create({
  baseURL: baseURL,
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
    if (response.data.code === "401") {
      // 1. clear token
      // 2.redirect to login page
      removeToken();
      router.navigate(loginUrl);
      alert("Please login again.");
      window.location.reload();
      response.data.data = { nickname: "" };
    }
    return response.data;
  },
  (error) => {
    removeToken();
    router.navigate("/login");
    alert("Something went wrong. Please login again later.");
    window.location.reload();

    return Promise.reject(error);
  }
);

export { req };
