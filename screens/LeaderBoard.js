/*
  The Leader board shows the first five users with the best score
*/

import {
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db, rdb } from "../config/firebase";
import { get, child, ref } from "firebase/database";
import ListElements from "../components/ListElements";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState([]);
  const navigation = useNavigation();
  const reference = ref(rdb);

  useEffect(() => {
    // fetching the first five users with the best score from the database

    const fetchLeaders = () => {
      get(child(reference, "users/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // fetch users
            const data = snapshot.val();
            // sort users
            const sort = Object.values(data).sort((a, b) =>
              a.score > b.score ? -1 : 1
            );
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
  });

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
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Return to Home</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginTop: "30%",
    width: "100%",
  },
  btn: {
    backgroundColor: "#FF9933",
    width: "40%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    fontWeight: "700",
    fontSize: 17,
    color: "white",
  },
});
