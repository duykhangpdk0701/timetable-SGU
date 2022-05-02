import { Text } from "@rneui/base";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { convertAmountOfTimeToSpecificTime } from "../../../utils/convertAmountOfTimeToSpecificTime";
import getColor from "../../../utils/getColor";
import { getHeight, getLatitude } from "../../../utils/getPosition";
import { moderateScale } from "../../../utils/ScaleUnit";
import styles from "./RenderTimeTable.styles";

const RenderTimeTable = () => {
  const state = useSelector((state) => state.timeTableDay) || {
    current: [],
    loading: false,
  };

  return (
    <View style={styles.section}>
      {/* this will loop over the ScheduleArray */}
      {state.current.map((item, index) =>
        item.scheduleArray.map((itemSchedule, indexSchedule) => {
          const specificsTime = convertAmountOfTimeToSpecificTime(
            itemSchedule.subjectStart,
            itemSchedule.amountOfSubject,
          );
          const positionStart = getLatitude(itemSchedule.subjectStart);
          const height = getHeight(itemSchedule.amountOfSubject);
          const isPractice = itemSchedule.th === "" ? "" : "(Thực Hành)";

          return (
            <View
              key={index + indexSchedule}
              style={[
                styles.contentContainer,
                {
                  top: moderateScale(positionStart),
                  height: moderateScale(height),
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

export default RenderTimeTable;
