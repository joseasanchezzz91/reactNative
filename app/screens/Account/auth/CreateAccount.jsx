import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes cuenta?
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        {" "}
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
});
