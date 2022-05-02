import React, { useEffect, useState } from "react";
import { Text } from "@rneui/base";
import styles from "./Week.styles";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getByWeekTimeTableAsync } from "../../redux/timeTableWeekSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { View } from "react-native";
import Ruler from "../../components/Ruler";
import RenderTimeTableWeek from "./RenderTimeTableWeek";
import getAllDayOfWeek from "../../helper/getAllDaysOfWeek";
import DaysOfWeekRuler from "../../components/DaysOfWeekRuler";

const Week = ({ navigation }) => {
  const dispatch = useDispatch();
  const dateFormat = "Tháng " + moment().format("MM/YYYY");
  const [dateOfWeek, setDateOfWeek] = useState([]);
  const studentIDRedux = useSelector((state) => state.auth.current.studentID);

  useEffect(() => {
    const fetchTimeTableByWeek = async () => {
      try {
        const currentDate = moment().format();
        const studentID = await AsyncStorage.getItem("studentID");
        const action = await getByWeekTimeTableAsync({
          id: studentID,
          Date: currentDate,
        });
        const actionResult = await dispatch(action);
        await unwrapResult(actionResult);
      } catch (error) {
        console.log("error" + error);
      }
    };

    const getDaysOfWeek = () => {
      const currentDate = moment().format();
      setDateOfWeek(getAllDayOfWeek(currentDate));
    };

    getDaysOfWeek();
    fetchTimeTableByWeek();
  }, [studentIDRedux]);

  return (
    <SafeAreaView style={styles.section}>
      <ScrollView>
        <Text style={styles.timeTitle}>{dateFormat}</Text>
        <View style={styles.contentContainer}>
          <View style={styles.rulerContainer}>
            <View style={styles.emptyBox}></View>
            <Ruler />
          </View>
          <View style={styles.contentWrapper}>
            <ScrollView horizontal={true}>
              <View style={styles.contentHorizontal}>
                <DaysOfWeekRuler dateOfWeek={dateOfWeek} />
                <RenderTimeTableWeek />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Week;
