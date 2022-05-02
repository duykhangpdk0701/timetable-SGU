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

  contentWrapper: {
    flexBasis: "85%",
    position: "relative",
    paddingTop: moderateScale(10),
  },
});
export default styles;
