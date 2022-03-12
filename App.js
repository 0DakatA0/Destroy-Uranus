import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth, db } from "./config/firebase";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LeaderBoard from "./screens/LeaderBoard";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

const App = () => {
  const user = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Login Successful");
    } else {
      console.log("Login Failed");
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={user ? "Home" : "Login"}
        initialRouteName="LeaderBoard"
        screenOptions={{
          headerShown: false,
        }}
        component={HomeScreen}
      >
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
