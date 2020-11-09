import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/Account/Account";
import Login from "../screens/Account/auth/Login";
import Register from "../screens/Account/auth/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Mi Cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar sesion" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
}
