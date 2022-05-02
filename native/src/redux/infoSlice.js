import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import timeTableApi from "../api/timeTableApi";

const initialState = {
  current: {
    name: "",
    studentID: "",
  },
  loading: false,
  error: "",
};

export const getNameByID = createAsyncThunk("name/getName", async (data) => {
  const { id } = data;
  const res = await timeTableApi.getName(id);
  return res;
});

const nameSlice = createSlice({
  name: "name",
  initialState,

  reducers: {
    setStudentIdRedux: (state, action) => {
      state.current.studentID = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNameByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNameByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getNameByID.fulfilled, (state, action) => {
        state.loading = false;
        state.current.name = action.payload.name;
      });
  },
});

export const { setStudentIdRedux } = nameSlice.actions;

export default nameSlice.reducer;
