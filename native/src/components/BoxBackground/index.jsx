import React from "react";
import { View } from "react-native";
import styles from "./BoxBackground.styles";

const BoxBackground = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>

      <View style={[styles.box, styles.height20]}></View>

      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>

      <View style={[styles.box, styles.height90]}></View>

      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>

      <View style={[styles.box, styles.height20]}></View>

      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>

      <View style={[styles.box, styles.height10]}></View>

      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>
      <View style={[styles.box, styles.height50]}></View>
    </View>
  );
};

export default BoxBackground;
