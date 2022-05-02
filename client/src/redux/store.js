import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import timetableWeekReducer from "./timetableWeekSlice";
import timetableDayReducer from "./timetableDaySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    timetableWeek: timetableWeekReducer,
    timetableDay: timetableDayReducer,
  },
});
