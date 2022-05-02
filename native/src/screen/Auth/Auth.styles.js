import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/ScaleUnit";

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    paddingBottom: moderateScale(50),
  },

  logoContainer: {
    width: "100%",
    height: moderateScale(100),
    display: "flex",
    alignItems: "center",
    marginBottom: moderateScale(70),
  },

  logo: {
    width: moderateScale(100),
    height: "100%",
  },

  form: {
    width: "100%",
    paddingHorizontal: moderateScale(50),
  },

  input: {
    height: moderateScale(40),
    fontSize: moderateScale(15),
  },

  buttonLogin: {
    borderRadius: 25,
    height: moderateScale(40),
  },

  buttonText: {
    fontSize: moderateScale(15),
  },
});

export default styles;
