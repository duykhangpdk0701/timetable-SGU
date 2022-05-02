import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Nav from "../../components/Nav";
import styles from "./Timetable.module.scss";
import { TabContext, TabPanel } from "@mui/lab";
import TabWeek from "./TabWeek";
import TabDay from "./TabDay";

const TimeTable = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("1");
  const info = useSelector((state) => state.auth.current);

  // checking if studentID exist it will you redirect you to timetable page directly
  useEffect(() => {
    const autoLogin = async () => {
      const studentID = localStorage.getItem("studentID");
      if (studentID) {
        try {
          const action = await loginAsync({ studentID });
          const actionResult = await dispatch(action);
          await unwrapResult(actionResult);
          navigate("/timetable");
        } catch (error) {
          console.log("auto login and fetching data have been fail");
        }
      }
    };
    autoLogin();
  }, [navigate, dispatch]);

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("studentID");
    navigate("/");
  };

  return (
    <section className={styles.section}>
      <Nav
        tabValue={tabValue}
        handleChangeTabValue={handleChangeTabValue}
        handleLogout={handleLogout}
      />
      <TabContext value={tabValue}>
        <TabPanel value="1">
          <TabWeek />
        </TabPanel>
        <TabPanel value="2">
          <TabDay />
        </TabPanel>
      </TabContext>
    </section>
  );
};

export default TimeTable;
