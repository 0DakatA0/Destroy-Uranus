import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth, db } from "./config/firebase";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import QuizScreen from "./screens/QuizScreen";
import DailyFact from "./screens/DailyFact";
import LeaderBoard from "./screens/LeaderBoard";

const Stack = createNativeStackNavigator();

const App = () => {
  const user = auth.currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
        // initialRouteName="LeaderBoard"
        screenOptions={{
          headerShown: false,
        }}
        component={HomeScreen}
      >
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />

        <Stack.Screen name="Quiz" component={QuizScreen} />

        <Stack.Screen name="Fact of the Day" component={DailyFact} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
