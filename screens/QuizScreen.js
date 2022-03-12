/*
  This is the Quiz Screen file. Here you can find all the functionality and scripts
  needed for the Quiz to make.
*/

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
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
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Button from "../components/Button";
import CountDown from "react-native-countdown-component";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const QuizScreen = () => {
  // Initializing States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [useHints, setUseHints] = useState(false);

  const [quizData, setQuizData] = useState([]);

  const user = auth.currentUser;
  // const db = getDatabase();
  const navigation = useNavigation();

  // Get Quiz and User data from DB
  useEffect(() => {
    const quizRef = ref(rdb, "quiz");
    onValue(quizRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      setQuizData(data);
    });

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

  // Check if Option is Valid
  const validateAnswer = (selectedOption) => {
    let correctOption = quizData[currentQuestionIndex]?.answer;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correctOption);
    setIsOptionDisabled(true);
    if (selectedOption == correctOption) {
      // Check if Used Hints
      if (useHints) {
        // Set Score
        setScore(score + quizData[currentQuestionIndex]?.points - 1);
      } else {
        setScore(score + quizData[currentQuestionIndex]?.points);
      }
      update(ref(rdb, "users/" + user.uid), {
        score,
      });
      setCorrectAnswers(correctAnswers + 1);
      // console.log("Score: " + score);
      // console.log("Answers: " + correctAnswers);
    }

    // Set Explanation to Show
    setShowExplanation(true);

    // Show Next Button
    setShowNextButton(true);
  };

  // Handle What Happens Next
  const handleNext = () => {
    if (currentQuestionIndex == quizData.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 2,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  // Render the Question
  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 20,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: colors.white, fontSize: 18, opacity: 0.6 }}>
            / {quizData.length}
          </Text>
          <Text
            style={{
              color: colors.success,
              fontSize: 20,
            }}
          >
            {"  "}({quizData[currentQuestionIndex]?.points} points)
          </Text>
          <Text
            style={{
              color: colors.success,
              fontSize: 20,
            }}
          >
            {"             "}Current score: {score}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: colors.white,
            fontSize: 30,
            fontWeight: "700",
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          {quizData[currentQuestionIndex]?.question}{" "}
        </Text>
        <Image
          style={{
            height: 200,
            width: 200,
            borderRadius: 25,
            //margin: 10,
            marginBottom: 10,
            alignSelf: "center",
          }}
          source={{ uri: quizData[currentQuestionIndex]?.img }}
        />

        {/* Hint Functionality */}
        <TouchableOpacity
          onPress={() => {
            setUseHints(true);
            Alert.alert("Hint", quizData[currentQuestionIndex]?.hint, [
              { text: "OK" },
            ]);
          }}
        >
          <Text
            style={{
              color: "#bbb6af",
              fontSize: 20,
              alignSelf: "center",
              marginTop: 10,
              marginBottom: -13,
            }}
          >
            Use a hint{" "}
            <Text
              style={{
                color: "#ff9933",
                fontSize: 20,
              }}
            >
              (-1 point)
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render the Question Options
  const renderOptions = () => {
    return (
      <View>
        {quizData[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            onPress={() => {
              validateAnswer(option);
            }}
            disabled={isOptionDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? colors.success
                  : option == currentOptionSelected
                  ? colors.error
                  : colors.secondary + "40",
              backgroundColor:
                option == correctOption
                  ? colors.success + "20"
                  : option == currentOptionSelected
                  ? colors.error + "20"
                  : colors.secondary + "20",
              height: 45,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 5,
            }}
          >
            <Text style={{ fontSize: 20, color: colors.white }}>{option}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: colors.success,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: colors.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: colors.error,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  style={{
                    color: colors.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render the Next Question Button
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={() => {
            handleNext();
            update(ref(rdb, "users/" + user.uid), {
              score,
            });
          }}
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: colors.accent,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.white,
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, quizData.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: colors.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: colors.background,
          position: "relative",
        }}
      >
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Explanation Window */}
        <Modal
          visible={showExplanation}
          animationType="fade"
          transparent={true}
        >
          <View
            style={{
              backgroundColor: "#000000aa",
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: "#744ebf",
                margin: 30,
                padding: 20,
                borderRadius: 10,
                flex: 1,
              }}
            >
              <ScrollView>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignSelf: "center",
                    color: colors.white,
                  }}
                >
                  {quizData[currentQuestionIndex]?.answer}...
                </Text>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 25,
                    marginTop: 10,
                    alignSelf: "center",
                    marginBottom: 20,
                  }}
                  source={{ uri: quizData[currentQuestionIndex]?.img }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.white,
                  }}
                >
                  {quizData[currentQuestionIndex]?.explanation}
                </Text>
                <Button
                  title="Close"
                  onPress={() => {
                    setShowExplanation(false);
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>Summary</Text>

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
                    color: colors.success,
                  }}
                >
                  {correctAnswers}/{quizData.length} correct answers!
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.secondary,
                  }}
                >
                  You now have a total of {score} points!
                </Text>
              </View>

              {/* Go Back button */}
              <Button
                title="Home"
                onPress={() => {
                  update(ref(rdb, "users/" + user.uid), {
                    score,
                  });
                  navigation.navigate("Home");
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const colors = {
  primary: "#744EBF",
  secondary: "#ff9a1e",
  accent: "#FF9933",

  success: "#00C851",
  error: "#ff4444",

  black: "#171717",
  white: "#FFFFFF",
  background: "#744EBF",
};

const sizes = {
  base: 10,
  width,
  height,
};
