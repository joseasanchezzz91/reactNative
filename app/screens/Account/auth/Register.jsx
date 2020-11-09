import React, { useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../../components/Account/RegisterForm";

export default function Register() {
  const toastRef = useRef();
  return (
    <KeyboardAwareScrollView>
      <Image
        source={"require('../../../../assets/img/logo.png')"}
        resizeMode="contain"
        style={styles.log}
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 50,
    marginTop: 20,
  },
  viewForm: {
    marginLeft: 40,
    marginRight: 40,
  },
});
