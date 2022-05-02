import { Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { convertAmountOfTimeToSpecificTime } from "../../../utils/convertAmountOfTimeToSpecificTime";
import getColor from "../../../utils/getColor";
import {
  getHeight,
  getLatitude,
  getLongitude,
} from "../../../utils/getPosition";
import { moderateScale } from "../../../utils/ScaleUnit";
import styles from "./RenderTimeTableWeek.style";

const RenderTimeTableWeek = () => {
  const state = useSelector((state) => state.timeTableWeek) || {
    current: [],
    loading: false,
  };

  return (
    <View style={styles.container}>
      {state.current.map((item, index) =>
        item.scheduleArray.map((itemSchedule, indexSchedule) => {
          const specificsTime = convertAmountOfTimeToSpecificTime(
            itemSchedule.subjectStart,
            itemSchedule.amountOfSubject,
          );
          const latitude = getLatitude(itemSchedule.subjectStart);
          const longitude = getLongitude(itemSchedule.dow);
          const height = getHeight(itemSchedule.amountOfSubject);
          const isPractice = itemSchedule.th === "" ? "" : "(Thực Hành)";

          return (
            <View
              key={index + indexSchedule}
              style={[
                styles.contentContainer,
                {
                  top: moderateScale(latitude),
                  height: moderateScale(height),
                  left: moderateScale(longitude),
                  backgroundColor: getColor(index).background,
                  borderColor: getColor(index).border,
                },
              ]}>
              <View
                style={[
                  styles.sideBar,
                  { backgroundColor: getColor(index).border },
                ]}></View>

              <View style={styles.contentWrapper}>
                <Text style={styles.name}>
                  {item.name.trim()} {isPractice}
                </Text>
                <Text style={styles.room}>Phòng: {itemSchedule.room}</Text>
                <Text style={styles.timeLine}>
                  {specificsTime.timeStart} - {specificsTime.timeEnd} (
                  {itemSchedule.amountOfSubject} Tiết)
                </Text>
              </View>
            </View>
          );
        }),
      )}
    </View>
  );
};

export default RenderTimeTableWeek;
