import { Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import styles from "./DaysOfWeekRuler.style";
import moment from "moment";

const DaysOfWeekRuler = (props) => {
  const { dateOfWeek } = props;

  return (
    <View style={styles.container}>
      {dateOfWeek.map((item, index) => (
        <View key={index} style={styles.daysOfWeekWrapper}>
          <Text style={styles.dayOfWeekText}>{item.name}</Text>
          <Text style={styles.dayText}>{moment(item).format("DD")}</Text>
        </View>
      ))}
    </View>
  );
};

export default DaysOfWeekRuler;
