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
} from "react-native";
import { rdb } from "../config/firebase";
import { getDatabase, get, onValue, ref } from "firebase/database";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";

const { width, height } = Dimensions.get("window");

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const [quizData, setQuizData] = useState([]);

  // const db = getDatabase();

  useEffect(() => {
    const quizRef = ref(rdb, "quiz");
    onValue(quizRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setQuizData(data);
    });
  }, []);

  const validateAnswer = (selectedOption) => {
    let correctOption = quizData[currentQuestionIndex]?.answer;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correctOption);
    setIsOptionDisabled(true);
    if (selectedOption == correctOption) {
      // Set Score
      setScore(score + 1);
    }

    // Set Explanation to Show
    setShowExplanation(true);

    // Show Next Button
    setShowNextButton(true);
  };

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
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
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
          {quizData[currentQuestionIndex]?.question}
        </Text>
        <Image
          style={{
            height: 200,
            width: 200,
            borderRadius: 25,
            marginTop: 10,
            alignSelf: "center",
          }}
          source={{ uri: quizData[currentQuestionIndex]?.img }}
        />
      </View>
    );
  };

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
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
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
            Next Question
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
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > quizData.length / 2 ? "Congratulations!" : "Oops!"}{" "}
                {/* change to point gain summary */}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color:
                      score > quizData.length / 2
                        ? colors.success
                        : colors.error,
                  }}
                >
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.black,
                  }}
                >
                  / {quizData.length}
                </Text>
              </View>
              {/* Retry Quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: colors.accent,
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.white,
                    fontSize: 20,
                  }}
                >
                  Retry Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const colors = {
  primary: "#252c4a", // we dont need that
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
