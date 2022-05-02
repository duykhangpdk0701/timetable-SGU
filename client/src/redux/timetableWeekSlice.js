import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import timetableApi from "../api/timetableApi";

const initialState = {
  current: [],
  loading: false,
  error: "",
};

export const getByWeekTimeTableAsync = createAsyncThunk(
  "timetableWeek/getByWeek",
  async (data) => {
    const { id, date } = data;
    const res = await timetableApi.getByWeek(id, date);
    return res;
  },
);

export const timetableSlice = createSlice({
  name: "timetableWeek",
  initialState,
  reducers: {
    clearTimeTableWeekData: (state) => {
      state.current = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // get by week
      .addCase(getByWeekTimeTableAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByWeekTimeTableAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getByWeekTimeTableAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.timetable;
      });
  },
});

export const { clearTimeTableWeekData } = timetableSlice.actions;

export default timetableSlice.reducer;
