import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../config/firebase";
import Button from "../components/Button";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {};

  return (
    <ImageBackground
      source={require("../Design/WelcomePage.png")}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {/* Profile Picture */}
        <Image
          style={styles.userImg}
          source={require("../assets/favicon.png")}
        />

        {/* Username */}
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 30,
          }}
        >
          Hello, John!
        </Text>

        {/* User Points */}
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 25,
            marginBottom: 30,
          }}
        >
          You have 0 points!
        </Text>

        {/* Start a New Quiz button */}
        <Button onPress={() => {}} title="Start a new Quiz" />

        {/* Leaderboard button */}
        <Button onPress={() => {}} title="Leaderboard" />

        {/* Logout button? */}
        <Button onPress={() => {}} title="Logout" />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  //   userName: {
  //     color: "white",
  //     fontWeight: "700",
  //     fontSize: 30,
  //     marginBottom: 30,
  //   },
});
