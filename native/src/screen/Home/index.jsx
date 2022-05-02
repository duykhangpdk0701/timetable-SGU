import { Text } from "@rneui/base";
import moment from "moment";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ruler from "../../components/Ruler";
import styles from "./Home.style";
import { unwrapResult } from "@reduxjs/toolkit";
import RenderTimeTable from "./RenderTimeTable";
import { getByDayTimeTableAsync } from "../../redux/timeTableDaySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const dateFormat =
    moment().format("DD") + " Tháng " + moment().format("MM YYYY");
  const studentIDRedux = useSelector((state) => state.auth.current.studentID);

  useEffect(() => {
    const isLogin = async () => {
      try {
        const studentID = await AsyncStorage.getItem("studentID");
        if (!studentID) {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTimeTableByDay = async () => {
      try {
        const studentID = await AsyncStorage.getItem("studentID");
        const currentDate = moment().format();
        const action = await getByDayTimeTableAsync({
          id: studentID,
          date: currentDate,
        });
        const actionResult = await dispatch(action);
        await unwrapResult(actionResult);
      } catch (error) {
        console.log("error: " + error);
      }
    };

    const main = async () => {
      await isLogin();
      await fetchTimeTableByDay();
    };

    main();
    return;
  }, [studentIDRedux]);

  return (
    <SafeAreaView style={styles.section}>
      <ScrollView>
        <Text style={styles.timeTitle}>{dateFormat}</Text>
        <View style={styles.contentContainer}>
          <Ruler />
          <View style={styles.contentWrapper}>
            <RenderTimeTable />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
