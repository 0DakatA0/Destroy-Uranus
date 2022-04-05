import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const url =
  "https://api.nasa.gov/planetary/apod?api_key=qzXavvTLhxwcEuBXc8uBygbnQEdrdhdBsfNKuGoH";

const DailyFact = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setName(json.title);
        setImage(String(json.url));
        setText(json.explanation);
      })
      .catch((error) => alert(error)); // display errors
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.bigText}> Did you know that ... ? </Text>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={styles.bigText}> {name}</Text>
        <Text style={styles.justText}> {text}</Text>
        <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
      </View>
  );
};

export default DailyFact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#744ebf",
  },
  bigText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  image: {
    height: "30%",
    width: "90%",
    borderRadius: 20,
    margin: 10,
  },
  justText: {
    color: "white",
    display: "flex",
    width: "90%",
    fontSize: 16,
  },
});
