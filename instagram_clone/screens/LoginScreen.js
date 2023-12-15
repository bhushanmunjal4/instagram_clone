import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LoginForm from "../components/loginScreen/LoginForm";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={{ height: 150, width: 150, resizeMode: "contain" }}
        />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default LoginScreen;
