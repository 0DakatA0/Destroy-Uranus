import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "@firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const initUser = async (username, id) => {
    const user = {
      username: username,
      imageURL: "",
      score: 0,
    };

    await setDoc(doc(db, "users", id), user);
  };

  return (
    <ImageBackground
      source={require("../Design/WelcomePage.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              initUser(username, user.uid);
              setEmail("");
              setPassword("");
              navigation.navigate("Home");
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode + ": " + errorMessage);
              // ..
            });
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  input: {
    height: 40,
    margin: 5,
    padding: 10,
    width: "60%",
    borderRadius: 20,
    backgroundColor: "#f5a742",
    color: "white",
  },
  btn: {
    width: "40%",
    height: 50,
    backgroundColor: "#f5a742",
    borderRadius: 25,
    margin: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegisterScreen;
