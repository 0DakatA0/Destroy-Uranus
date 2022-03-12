import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { db, auth  } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import Button from "../components/Button";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getDoc(doc(db, "users", user.uid));
      setUsername(await data.data().username);
      setScore(await data.data().score);
    };

    fetchUserData();
  });

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
          source={require("../assets/UserIcon.png")}
        />

        {/* Username */}
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 30,
          }}
        >
          Hello, {username}!
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
          You have {score} points!
        </Text>

        {/* Start a New Quiz button */}
        <Button onPress={() => {}} title="Start a new Quiz" />

        {/* Leaderboard button */}
        <Button onPress={() => {navigation.navigate("LeaderBoard")}} title="Leaderboard" />

        {/* Logout button? */}
        <Button
          onPress={() => {
            navigation.navigate("Login");
          }}
          title="Logout"
        />
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
