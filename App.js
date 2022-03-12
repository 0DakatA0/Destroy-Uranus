import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { auth, db, rdb } from "./config/firebase";
import { getDatabase, get, onValue, ref } from "firebase/database";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import QuizScreen from "./screens/QuizScreen";
import DailyFact from "./screens/DailyFact";

const Stack = createNativeStackNavigator();

const App = () => {
  const user = auth.currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
        }}
        component={HomeScreen}
      >

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            user,
          }}
        />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <QuizScreen />
  );
};

export default App;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});