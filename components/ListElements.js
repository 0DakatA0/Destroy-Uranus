import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ListElements = ({ imageURL, user, score }) => {
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

  return (
    <View style={styles.container}>
      <Image source={userIcons[imageURL]} style={styles.img} />
      <Text style={styles.title}>{user}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default ListElements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    flexDirection: "row",
    backgroundColor: "#f5a742",
    borderTopWidth: 2,
    borderColor: "#f58442"
  },
  img: {
    width: 50,
    height: 50,
    marginLeft: 5,
  },
  score: {
    marginRight: 10,
    fontSize: 25,
    color: "white",
  },
  title: {
    fontSize: 25,
    color: "white",
  }
});
