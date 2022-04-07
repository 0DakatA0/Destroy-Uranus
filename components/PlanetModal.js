import { StyleSheet, Text, View, Modal, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { rdb, auth } from "../config/firebase";
import {
  getDatabase,
  get,
  onValue,
  ref,
  set,
  update,
  child,
} from "firebase/database";

const PlanetModal = ({
  isVisible,
  title,
  onConfirm,
  imageSource,
  data,
  reqPoints,
}) => {
  const navigation = useNavigation();

  const [score, setScore] = useState(0);

  const user = auth.currentUser;
  //   console.log(data);

  useEffect(() => {
    // const quizRef = ref(rdb, "quiz");
    // onValue(quizRef, (snapshot) => {
    //   const data = snapshot.val();
    //   // console.log(data);
    //   setQuizData(data);
    // });
    // console.log(quizData);

    const fetchUserData = () => {
      get(child(ref(rdb), `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setScore(snapshot.val().score);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchUserData();
  }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#000000aa",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            borderRadius: 20,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {title}{" "}
            <Image
              source={imageSource}
              style={{
                width: 55,
                height: 55,
              }}
            />
          </Text>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "green",
              }}
            >
              Required points to access: {reqPoints}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#FF9933",
              }}
            >
              You have: {score}
            </Text>
          </View>

          {/* Go to quiz button */}
          <Button
            title="Start the Quiz"
            onPress={() => {
              //   navigation.navigate("Test", { data });
              if (score < reqPoints) {
                Alert.alert(
                  "Acess denied!",
                  "You don't have the minimum required points to access this level.",
                  [{ text: "OK" }]
                );
              } else {
                  navigation.navigate("Quiz", { data });
              }
            }}
          />

          {/* Go Back button */}
          <Button title="Close" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
};

export default PlanetModal;

const styles = StyleSheet.create({});
