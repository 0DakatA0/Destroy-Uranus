import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Log In</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user.uid);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode + ": " + errorMessage);
            });

          // navigation.navigate("Home");
        }}
      >
        <Text style={{ color: "white" }}>Log In</Text>
      </TouchableOpacity>
      <Text style={{color: "white"}}>Don't have an account?</Text>
      <TouchableOpacity /*onPress={() => navigation.navigate("Register")}*/>
        <Text style={{color: "white"}}>Sign up here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c242f5",
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
    width: "80%",
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

export default LoginScreen;
