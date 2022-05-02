import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import timeTableApi from "../api/timeTableApi";

const initialState = {
  current: [],
  loading: true,
  error: "",
};

export const getByIdTimeTableAsync = createAsyncThunk(
  "timetable/getById",
  async (data) => {
    const { id } = data;
    const res = await timeTableApi.getById(id);
    return res;
  },
);

export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    clearTimeTableData: (state) => {
      state.current = [];
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder
      //get by Id
      .addCase(getByIdTimeTableAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByIdTimeTableAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getByIdTimeTableAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.timetable;
      });
  },
});

export const { clearTimeTableData } = timetableSlice.actions;

export default timetableSlice.reducer;
