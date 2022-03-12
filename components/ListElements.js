import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ListElements = ({ imageURL, user, score }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/UserIcon.png")} style={styles.img} />
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
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  score: {
    marginRight: 10,
    fontSize: 25,
  },
  title: {
    fontSize: 25,
  }
});
