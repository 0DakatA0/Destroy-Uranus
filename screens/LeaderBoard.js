import { StyleSheet, ImageBackground, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { db, rdb } from "../config/firebase";
import { get, child, ref } from "firebase/database";
import ListElements from "../components/ListElements";

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState([]);

  const reference = ref(rdb);

  const fetchLeaders = () => {
    get(child(reference, "users/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const sort = Object.values(data).sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          const res = sort.splice(0, 5);
          setLeaders(res);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };

  fetchLeaders();

  useEffect(() => {});

  return (
    <ImageBackground
      source={require("../Design/LeaderBoardPage.png")}
      style={styles.container}
    >
      <FlatList
        style={styles.list}
        data={leaders}
        renderItem={({ item }) => (
          <ListElements
            imageURL={item.imageURL}
            user={item.username}
            score={item.score}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </ImageBackground>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    marginTop: "30%",
  },
});
