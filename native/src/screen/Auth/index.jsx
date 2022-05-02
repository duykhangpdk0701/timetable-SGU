import AsyncStorage from "@react-native-async-storage/async-storage";
import { unwrapResult } from "@reduxjs/toolkit";
import { Input, Image, Text, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
import { moderateScale } from "../../utils/ScaleUnit";
import styles from "./Auth.styles";

const Login = ({ navigation }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [studentID, setStudentID] = useState("3119560029");
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);

  const handleLogin = async () => {
    setDisableButton(true);

    try {
      const action = await loginAsync({ studentID });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      await AsyncStorage.setItem("studentID", studentID);
      setDisableButton(false);
      navigation.navigate("Home");
    } catch (error) {
      setDisableButton(false);
    }
  };

  useEffect(() => {
    if (studentID.length === 10) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [studentID]);

  return (
    <View style={styles.section}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
        <Text h4>Welcome back</Text>
      </View>
      <View style={styles.form}>
        <Input
          inputStyle={styles.input}
          placeholder="Enter your Student Id"
          value={studentID}
          onChangeText={setStudentID}
          disabled={state.loading}
          errorMessage={state.error !== "" && `${state.error.message}`}
        />
        <Button
          loading={state.loading}
          onPress={handleLogin}
          titleStyle={styles.buttonText}
          title={"Log In"}
          buttonStyle={styles.buttonLogin}
          loadingProps={{
            size: moderateScale(25),
          }}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default Login;
