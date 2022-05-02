import { configureStore } from "@reduxjs/toolkit";
import timeTableReducer from "./timeTableSlice";
import timeTableDayReducer from "./timeTableDaySlice";
import timeTableWeekReducer from "./timeTableWeekSlice";
import infoReducer from "./infoSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    timeTable: timeTableReducer,
    timeTableDay: timeTableDayReducer,
    timeTableWeek: timeTableWeekReducer,
    info: infoReducer,
    auth: authReducer,
  },
});
