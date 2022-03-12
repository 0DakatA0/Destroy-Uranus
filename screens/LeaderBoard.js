import { StyleSheet, ImageBackground, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import ListElements from "../components/ListElements";

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState([]);
  const leadersColRef = collection(db, "users");

  useEffect(() => {
    const fetchLeaders = async () => {
      const data = await getDocs(leadersColRef);
      setLeaders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLeaders(leaders.sort((a, b) => a.score > b.score ? -1 : 1));
      setLeaders(leaders.splice(0, 5));
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
