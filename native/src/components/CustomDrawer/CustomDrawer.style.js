import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/ScaleUnit";

const styles = StyleSheet.create({
  infoContainer: {
    display: "flex",
    paddingVertical: moderateScale(30),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  infoTextContainer: {
    marginLeft: moderateScale(10),
  },

  name: {
    fontWeight: "bold",
    fontSize: moderateScale(15),
  },

  studentID: {
    fontSize: moderateScale(13),
  },

  bottomContainer: {
    justifyContent: "center",
    padding: moderateScale(20),
    borderTopWidth: moderateScale(1),
    borderTopColor: "#ccc",
  },

  bottomContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  bottomText: {
    marginLeft: moderateScale(15),
  },
});

export default styles;
