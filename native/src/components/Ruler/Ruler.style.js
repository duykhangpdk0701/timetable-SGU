import { StyleSheet } from "react-native";
import { grayColor, grayTextColor } from "../../global/color";
import { moderateScale } from "../../utils/ScaleUnit";

const styles = StyleSheet.create({
  container: {
    flexBasis: "15%",
    borderRightColor: grayColor,
    borderRightWidth: moderateScale(1),
  },

  emptyBox: {
    marginBottom: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: grayColor,
  },

  text: {
    marginRight: moderateScale(1),
    height: moderateScale(20),
    fontSize: moderateScale(10),
    alignSelf: "center",
  },

  lineOfTimeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: moderateScale(60),
    alignItems: "flex-end",
    width: "100%",
    paddingRight: "10%",
    paddingBottom: moderateScale(10),
  },

  lineOfTimeWrapper: {
    height: moderateScale(1.3),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  lineOfTime: {
    height: moderateScale(1.2),
    width: moderateScale(10),
    backgroundColor: grayTextColor,
  },

  lineOfTimeLong: {
    width: moderateScale(20),
  },
  lineOfTimeMiddle: { width: moderateScale(15) },
});

export default styles;
