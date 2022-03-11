import { StyleSheet, ImageBackground, FlatList } from "react-native";
import React from "react";

const LeaderBoard = () => {
  const leaders = [
    {
      // imageURL:
      username: "Dankata",
      score: 1000,
    },
    {
      // imageURL:
      username: "Andriu",
      score: 950,
    },
  ];

  return (
    <ImageBackground
      source={require("../Design/LeaderBoardPage.png")}
      style={styles.container}
    >
      <FlatList />
    </ImageBackground>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
