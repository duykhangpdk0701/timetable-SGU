import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Text, Icon } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { moderateScale } from "../../utils/ScaleUnit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./CustomDrawer.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const info = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("studentID");
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.infoContainer}>
          <Avatar
            size={moderateScale(50)}
            rounded
            title={info.name !== "" ? info.name[0] : "none"}
            containerStyle={{
              backgroundColor: "#7f8c8d",
              marginLeft: moderateScale(20),
            }}
          />
          <View style={styles.infoTextContainer}>
            <Text style={styles.name}>{info.name}</Text>
            <Text style={styles.studentID}>{info.studentID}</Text>
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.bottomContent}>
            <Icon name="log-out" type="entypo" />
            <Text style={styles.bottomText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
