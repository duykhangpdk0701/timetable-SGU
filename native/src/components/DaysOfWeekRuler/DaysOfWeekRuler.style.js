import { color } from "@rneui/base";
import { StyleSheet } from "react-native";
import { grayColor, grayTextColor } from "../../global/color";
import { moderateScale } from "../../utils/ScaleUnit";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: moderateScale(50),
    marginBottom: moderateScale(10),
  },

  daysOfWeekWrapper: {
    width: moderateScale(250),

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderTopWidth: moderateScale(1),
    borderColor: grayColor,
  },

  dayOfWeekText: {
    fontWeight: "bold",
    color: grayTextColor,
    fontSize: moderateScale(12),
  },
  dayText: {
    fontWeight: "bold",
    fontSize: moderateScale(14),
  },
});

export default styles;
