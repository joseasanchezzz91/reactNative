import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty, set } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultformValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  console.log(loading);

  const onsubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorio");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas tienen q ser iguales");
    } else if (size.password < 6) {
      toastRef.current.show(
        "La contraseña tiene que tener al menos 6 caracteres"
      );
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((result) => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch((error) => {
          setLoading(false);
          toastRef.current.show(error.message);
        });
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  // const createTwoButtonAlert = () =>
  //   Alert.alert(
  //     "TE FALTA CALDO",
  //     `Cachay ${email}  ${password}`,
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") },
  //     ],
  //     { cancelable: false }
  //   );
  return (
    <View style={styles.formContaniner}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
        // onChangeText={(e) => emailValue(e)}
        onChange={(e) => onChange(e, "email")}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        // onChangeText={(e) => passwordValue(e)}
        onChange={(e) => onChange(e, "password")}
      />

      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={!showRepeatPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
        onChange={(e) => onChange(e, "repeatPassword")}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        style={styles.btnRegister}
        buttonStyle={styles.btnRegister}
        onPress={() => onsubmit}
      />
      <Loading isVisible={loading} text="Registrando Cuenta..." />
    </View>
  );
}

const defaultformValue = () => {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
};

const styles = StyleSheet.create({
  formContaniner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
