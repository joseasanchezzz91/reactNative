import React, { useRef } from "react";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { Divider } from "react-native-elements";
import Toast from "react-native-easy-toast";
import CreateAccount from "./CreateAccount";
import LoginForm from "../../../components/Account/LoginForm";

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text>Social Login</Text>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
