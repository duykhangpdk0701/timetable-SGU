import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const initialState = {
  current: { name: "", studentID: "" },
  loading: false,
  error: "",
};

export const loginAsync = createAsyncThunk("auth/login", async (data) => {
  const { studentID } = data;
  const res = await authApi.login(studentID);
  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginAsync.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.current.name = action.payload.name;
        state.current.studentID = action.payload.studentID;
        localStorage.setItem("studentID", action.payload.studentID);
      });
  },
});

export default authSlice.reducer;
