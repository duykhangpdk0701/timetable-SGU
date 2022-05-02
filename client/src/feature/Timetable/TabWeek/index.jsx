import React, { useEffect, useState } from "react";
import styles from "./TabWeek.module.scss";
import Calendar from "../../../components/Calendar";
import { getByWeekTimeTableAsync } from "../../../redux/timetableWeekSlice";
import { useDispatch, useSelector } from "react-redux";
import getAllDayOfWeek from "../../../utils/getAllDayOfWeek";
import moment from "moment";
import { unwrapResult } from "@reduxjs/toolkit";
import { Box, Chip, Typography } from "@mui/material";
import { convertCurrentTimeToPx } from "../../../utils/convertCurrentTimeToPx";
import Ruler from "../../../components/Ruler";
import BoxBackground from "../../../components/BoxBackgroud";
import { convertAmountOfTimeToSpecificTime } from "../../../utils/convertAmountOfTimeToSpecificTime";
import getColor from "../../../utils/getColor";
import { getGridRowBegin, getGridRowEnd } from "../../../utils/getGridRow";
import { convertDateOfWeekToNumber } from "../../../utils/convertDayOfWeekToNumber";

const TabWeek = () => {
  const [date, setDate] = useState(new Date());
  const dateFormat = "Tháng " + moment(date).format("MM/YYYY");
  const [dateOfWeek, setDateOfWeek] = useState([]);
  const dispatch = useDispatch();
  const timetableWeekValue = useSelector(
    (state) => state.timetableWeek.current,
  );

  useEffect(() => {
    const fetchTimetableWeek = async () => {
      try {
        const studentID = localStorage.getItem("studentID");
        const action = await getByWeekTimeTableAsync({ id: studentID, date });
        const actionResult = await dispatch(action);
        await unwrapResult(actionResult);
      } catch (error) {
        console.log(error);
      }
    };

    const getDayOfWeek = (date) => {
      setDateOfWeek(getAllDayOfWeek(date));
    };

    fetchTimetableWeek();
    getDayOfWeek(date);
  }, [date]);

  return (
    <div className={styles.main}>
      <Calendar date={date} setDate={setDate} />
      <div className={styles.main_content}>
        <div>
          <Typography
            sx={{ marginBottom: "2rem" }}
            className={styles.big_date}
            variant="h4">
            {dateFormat}
          </Typography>
          <div className={styles.timetable_container}>
            <Box
              sx={{
                top: convertCurrentTimeToPx(),
                position: "absolute",
                display: "flex",
                alignItems: "center",
                zIndex: "3",
              }}
              fullWidth
              className={styles.timeline_bar_container}>
              <Chip
                label={"09:00"}
                variant="outlined"
                sx={{
                  borderColor: "rgb(121, 226, 226)",
                  backgroundColor: "rgb(232, 252, 252)",
                  color: "rgb(121, 226, 226)",
                }}
              />
              <div className={styles.timeline_bar_line}></div>
            </Box>
            <Ruler />
            <div className={styles.time_content}>
              <div className={styles.weekname_container}>
                {dateOfWeek.map((value, index) => (
                  <div key={index} className={styles.weekname_wrapper}>
                    <Typography className={styles.weekname_name}>
                      {value.name}
                    </Typography>
                    <Typography className={styles.weekname_number}>
                      {moment(value).format("DD")}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className={styles.box_timetable_wrapper}>
                <BoxBackground />

                <div className={styles.render_timetable_container}>
                  {timetableWeekValue.map((value, index) =>
                    value.scheduleArray.map((valueSchedule, indexSchedule) => {
                      const timeStamp = convertAmountOfTimeToSpecificTime(
                        valueSchedule.subjectStart,
                        valueSchedule.amountOfSubject,
                      );

                      return (
                        <div
                          key={value.code + indexSchedule}
                          style={{
                            backgroundColor: getColor(index).background,
                            gridRow: `${getGridRowBegin(
                              valueSchedule.subjectStart,
                            )} / ${
                              getGridRowEnd(
                                valueSchedule.subjectStart,
                                valueSchedule.amountOfSubject,
                              )

                              // parseInt(valueSchedule.subjectStart) +
                              // parseInt(valueSchedule.amountOfSubject)
                            }`,
                            gridColumn: `${convertDateOfWeekToNumber(
                              valueSchedule.dow,
                            )} / ${
                              convertDateOfWeekToNumber(valueSchedule.dow) + 1
                            }`,
                          }}
                          className={styles.render_timetable}>
                          <div
                            style={{
                              backgroundColor: getColor(index).border,
                            }}
                            className={styles.render_timetable_border}></div>
                          <Typography variant="subtitle2">
                            {value.name}
                          </Typography>
                          <Typography variant="caption">
                            {valueSchedule.room}
                          </Typography>
                          <br />
                          <Typography variant="caption">
                            {timeStamp.timeStart} - {timeStamp.timeEnd} (
                            {valueSchedule.amountOfSubject} tiết)
                          </Typography>
                        </div>
                      );
                    }),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabWeek;
