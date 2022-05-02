import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/ScaleUnit";

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "#fff",
  },

  timeTitle: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(25),
    fontWeight: "700",
  },

  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  contentHorizontal: {
    width: moderateScale(1600),
  },

  rulerContainer: {
    flexBasis: "15%",
  },

  emptyBox: {
    height: moderateScale(50),
    width: moderateScale(20),
  },
});

export default styles;
