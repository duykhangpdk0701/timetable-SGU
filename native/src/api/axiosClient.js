import axios from "axios";
import { API_BASE_URL } from "@env";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // const token = localStorage["token"];
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res) {
      return res.data;
    }
    return res;
  },
  (error) => {
    return Promise.reject(error.response ? error.response.data : {});
  },
);

export default axiosClient;
