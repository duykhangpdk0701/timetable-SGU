import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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
    console.log(error.response.data);
    return Promise.reject(error.response ? error.response.data : {});
  },
);

export default axiosClient;
