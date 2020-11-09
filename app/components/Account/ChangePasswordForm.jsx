import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { reauthenticate } from "../../utils/api";
import { size } from "lodash";
import * as firebase from "firebase";

export default function ChangePasswordForm(props) {
  const { password, toastRef, setShowModal, setReloadUserInfo } = props;

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData());

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    let isSetErrors = true;
    setErrors({});
    let errorsTemp = {};
    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatPassword
    ) {
      errorsTemp = {
        password: !formData.password
          ? "La contraseña no puede estar vacia"
          : "",
        newPassword: !formData.newPassword
          ? "La contraseña no puede estar vacia"
          : "",
        repeatPassword: !formData.repeatPassword
          ? "La contraseña no puede estar vacia"
          : "",
      };
    } else if (formData.newPassword !== formData.repeatPassword) {
      errorsTemp = {
        newPassword: "Las contraseña no iguales",
        repeatPassword: "Las contraseña no iguales",
      };
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: "La contraseña tiene que ser mayor a 5 caracteres.",
        repeatPassword: "La contraseña tiene que ser mayor a 5 caracteres.",
      };
    } else {
      setIsLoading(true);
      console.log("elseeee");
      await reauthenticate(formData.password)
        .then(async () => {
          console.log("dentro del else");
          await firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
                console.log('dentro de cambiar');
              setIsLoading(false);
              isSetErrors = false;
              setShowModal(false);
              toastRef.currentUser.show("Contraseña cambiada exitosamente");
              console.log("desloguea");
              console.log("desloguea");
              firebase.auth().signOut();
            })
            .catch(() => {
              setIsLoading(false);
              errorsTemp = {
                other: "Error al cambiar la contraseña",
              };
            });
        })
        .catch(() => {
          errorsTemp = {
            password: "La contraseña no es correcta",
          };
          setIsLoading(false);
        });
    }

    isSetErrors ? setErrors(errorsTemp) : "";
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        secureTextEntry={!showPassword}
        defaultValue={password && password}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />

      <Input
        placeholder="Nueva Contraseña"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        defaultValue={password && password}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errors.newPassword}
        secureTextEntry={!showPassword}
      />

      <Input
        placeholder="Repetir nueva Contraseña"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        secureTextEntry={!showPassword}
        defaultValue={password && password}
        onChange={(e) => onChange(e, "repeatPassword")}
        errorMessage={errors.repeatPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        Loading={isLoading}
      />
      <Text>{errors.other}</Text>
    </View>
  );
}

const defaultFormData = () => {
  return {
    password: "",
    newPassword: "",
    repeatPassword: "",
  };
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
});
