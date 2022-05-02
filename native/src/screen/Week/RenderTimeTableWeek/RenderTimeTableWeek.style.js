import { StyleSheet } from "react-native";
import { moderateScale } from "../../../utils/ScaleUnit";

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  contentContainer: {
    position: "absolute",
    width: moderateScale(250),
    flexDirection: "row",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(7),
    padding: "4%",
  },

  sideBar: {
    height: "100%",
    marginRight: "5%",
    width: moderateScale(4),
    borderRadius: moderateScale(10),
  },
  name: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginBottom: moderateScale(2),
  },

  room: {
    fontSize: moderateScale(12),
    marginBottom: moderateScale(2),
  },

  timeLine: {
    fontSize: moderateScale(12),
  },
});

export default styles;
