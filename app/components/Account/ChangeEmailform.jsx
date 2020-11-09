import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailform(props) {
  const { email, toastRef, setShowModal, setReloadUserInfo } = props;

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(defaultFormData());
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    setErrors({});
    if (!formData.email || email === formData.email) {
      setErrors({ email: "El email no ha cambiado" });
    } else if (!validateEmail(formData.email)) {
      setErrors({ email: "Email incorrecto" });
    } else if (!formData.password) {
      setErrors({ password: "La contraseña no puede estar vacia" });
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then((response) => {
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              setIsLoading(false);
              setReloadUserInfo(true);
              toastRef.current.show("Email actualizado correctamente");
              setShowModal(false);
            })
            .catch(() => {
              setErrors({ email: "Error al actualizat el email" });
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setErrors({ password: "La contraseña no es correcta" });
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        defaultValue={email && email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        Loading={isLoading}
      />
    </View>
  );
}

const defaultFormData = () => {
  return {
    email: "",
    password: "",
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
