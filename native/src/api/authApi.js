import axiosClient from "./axiosClient";

const authApi = {
  login: async (studentID) => {
    const url = "auth/login";
    return axiosClient.post(url, { studentID });
  },
};

export default authApi;
