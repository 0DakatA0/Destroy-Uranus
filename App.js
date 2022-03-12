import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth, db } from "./config/firebase";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DailyFact from "./screens/DailyFact";


const Stack = createNativeStackNavigator();

const App = () => {
  const user = auth.currentUser;

  return (
    // <DailyFact/>
    
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
