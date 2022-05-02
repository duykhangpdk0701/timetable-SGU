import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import timeTableApi from "../api/timetableApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const getByDayTimeTableAsync = createAsyncThunk(
  "timetableDay/getByDay",
  async (data) => {
    const { id, date } = data;
    const res = await timeTableApi.getByDay(id, date);
    return res;
  },
);

export const timetableSlice = createSlice({
  name: "timetableDay",
  initialState,
  reducers: {
    clearTimeTableDayData: (state) => {
      state.current = [];
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //get by day
      .addCase(getByDayTimeTableAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByDayTimeTableAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getByDayTimeTableAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.timetable;
      });
  },
});

export const { clearTimeTableDayData } = timetableSlice.actions;

export default timetableSlice.reducer;
