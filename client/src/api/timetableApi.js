import axiosClient from "./axiosClient";

const timetableApi = {
  getById: async (id) => {
    const url = `/${id}`;
    return axiosClient.get(url);
  },

  getByWeek: async (id, date) => {
    const url = `/${id}/week`;
    return axiosClient.post(url, { date });
  },

  getByDay: async (id, date) => {
    const url = `/${id}/day`;
    return axiosClient.post(url, { date });
  },

  getName: async (id) => {
    const url = `/name/${id}`;
    return axiosClient.get(url);
  },
};

export default timetableApi;
