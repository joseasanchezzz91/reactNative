import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const { displayName, toastRef, setShowModal, setReloadUserInfo } = props;

  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre no puede estar vacio");
    } else if (displayName === newDisplayName) {
      setError("El nombre no puede ser igual al actual");
    } else {
      setIsLoading(true);
      const update = { displayName: newDisplayName };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then((e) => {
          toastRef.currentUser.show("Nombre actualizado correctamente");
          setReloadUserInfo(true);
          setIsLoading(false);
          setShowModal(false);
        })
        .catch((e) => {
          setError("Error al actualizar el nombre");
          console.log(e);
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        defaultValue={displayName && displayName}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error && error}
      />

      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        Loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
