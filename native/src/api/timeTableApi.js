import axiosClient from "./axiosClient";

const timeTableApi = {
  getById: async (id) => {
    const url = `/${id}`;
    return axiosClient.get(url);
  },

  getByWeek: async (id, date) => {
    const url = `/${id}/week`;
    return axiosClient.post(url, { date });
  },

  getName: async (id) => {
    const url = `/name/${id}`;
    return axiosClient.get(url);
  },

  getByDay: async (id, date) => {
    const url = `/${id}/day`;
    return axiosClient.post(url, { date });
  },
};

export default timeTableApi;
