/*
  This is the main menu in the app. There are buttons to navigate to the different 
  menus.
*/

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth, rdb } from "../config/firebase";
import { ref, child, get, update } from "firebase/database";
import Button from "../components/Button";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [icon, setIcon] = useState(0);

  const changeIcon = () => {
    let imageURL = icon === userIcons.length - 1 ? 0 : icon + 1;

    setIcon(imageURL);

    update(ref(rdb, "users/" + user.uid), {
      imageURL,
    });
  };

  const userIcons = [
    require(`../assets/UserIcons/w1.png`),
    require(`../assets/UserIcons/m2.png`),
    require(`../assets/UserIcons/w3.png`),
    require(`../assets/UserIcons/w5.png`),
    require(`../assets/UserIcons/m4.png`),
    require(`../assets/UserIcons/m6.png`),
    require(`../assets/UserIcons/w7.png`),
    require(`../assets/UserIcons/m1.png`),
    require(`../assets/UserIcons/w2.png`),
    require(`../assets/UserIcons/m3.png`),
    require(`../assets/UserIcons/w4.png`),
    require(`../assets/UserIcons/m5.png`),
    require(`../assets/UserIcons/w6.png`),
    require(`../assets/UserIcons/m7.png`),
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchUserData = () => {
        get(child(ref(rdb), `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUsername(snapshot.val().username);
              setScore(snapshot.val().score);
              setIcon(snapshot.val().imageURL);
              // console.log(snapshot.val().imageURL);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      fetchUserData();
    });
    return unsubscribe;
    // const fetchUserData = () => {
    //   get(child(ref(rdb), `users/${user.uid}`))
    //     .then((snapshot) => {
    //       if (snapshot.exists()) {
    //         setUsername(snapshot.val().username);
    //         setScore(snapshot.val().score);
    //         console.log(score);
    //       } else {
    //         console.log("No data available");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };
    // fetchUserData();
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../Design/WelcomePage.png")}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {/* Profile Picture */}
        <TouchableOpacity onPress={changeIcon}>
          <Image style={styles.userImg} source={userIcons[icon]} />
        </TouchableOpacity>

        {/* Username */}
        <Text
          style={{
            color: "#15f9fc",
            fontWeight: "700",
            fontSize: 30,
          }}
        >
          {username}
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
        <Button
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          title="Start a new Quiz"
        />

        {/* Fact Of The Day button */}
        <Button
          onPress={() => {
            navigation.navigate("Fact of the Day");
          }}
          title="Fact of the Day"
        />

        {/* Leaderboard button */}
        <Button
          onPress={() => {
            navigation.navigate("LeaderBoard");
          }}
          title="Leaderboard"
        />

        {/* Logout button */}
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
