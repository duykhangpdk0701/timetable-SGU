import { Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import { twentyFourHour } from "../../global/timeHour";
import { moderateScale } from "../../utils/ScaleUnit";
import styles from "./Ruler.style";

const Ruler = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyBox}></View>

      {twentyFourHour.map((value, index) => {
        return (
          <View key={index} style={styles.lineOfTimeContainer}>
            <View style={styles.lineOfTimeWrapper}>
              <Text style={styles.text}>{value}</Text>
              <View style={[styles.lineOfTime, styles.lineOfTimeLong]}></View>
            </View>

            <View style={styles.lineOfTimeWrapper}>
              <View style={styles.lineOfTime}></View>
            </View>

            <View style={styles.lineOfTimeWrapper}>
              <View style={styles.lineOfTime}></View>
            </View>

            <View style={styles.lineOfTimeWrapper}>
              <View style={[styles.lineOfTime, styles.lineOfTimeMiddle]}></View>
            </View>

            <View style={styles.lineOfTimeWrapper}>
              <View style={styles.lineOfTime}></View>
            </View>

            <View style={styles.lineOfTimeWrapper}>
              <View style={styles.lineOfTime}></View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Ruler;
