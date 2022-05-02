import { StyleSheet } from "react-native";
import { grayColor } from "../../global/color";
import { moderateScale } from "../../utils/ScaleUnit";

const styles = StyleSheet.create({
  container: {
    flexBasis: `100%`,
  },

  box: {
    borderBottomWidth: moderateScale(1),
    borderTopWidth: moderateScale(1),
    borderColor: grayColor,
  },

  height10: {
    height: moderateScale(10),
  },

  height50: {
    height: moderateScale(50),
  },

  height20: {
    height: moderateScale(20),
  },

  height90: {
    height: moderateScale(90),
  },
});

export default styles;
