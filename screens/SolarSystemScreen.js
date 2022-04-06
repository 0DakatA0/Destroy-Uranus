import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const { width, height } = Dimensions.get("window");

const SolarSystemScreen = () => {
  const [showMercury, setShowMercury] = useState(false);
  const [showVenus, setShowVenus] = useState(false);
  const [showEarth, setShowEarth] = useState(false);
  const [showMars, setShowMars] = useState(false);
  const [showJupiter, setShowJupiter] = useState(false);
  const [showSaturn, setShowSaturn] = useState(false);
  const [showUranus, setShowUranus] = useState(false);
  const [showNeptune, setShowNeptune] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/Path.png")}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => Alert.alert("Mercury clicked!")}
        style={{
          // backgroundColor: "#FF9933",
          width: "15%",
          padding: 0,
          height: 60,
          top: 84,
          left: 12,
        }}
      >
        <Image
          source={require("../assets/Mercury.png")}
          style={{
            // resizeMode: 'cover',
            // // position: 'relative',
            // top: 84,
            // left: 12,
            height: 60,
            width: 60,
            // backgroundColor: "white",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Venus clicked!")} style={{
        // backgroundColor: "#FF9933",
        width: "17%",
        padding: 0,
        height: -10,
        top: 24,
        left: 100
      }} >
        <Image source={require("../assets/Venus.png")} style={{
          // resizeMode: 'cover',
          // position: 'relative',
          // top: 30,
          // left: 100,
          height: 70,
          width: 70,
          // backgroundColor: 'white'
        }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Earth clicked!")} style={{
        // backgroundColor: "#FF9933",
        width: "19%",
        padding: 0,
        height: -10,
        top: -40,
        left: 200
      }} >
        <Image source={require("../assets/Earth.png")} style={{
          // resizeMode: 'cover',
          // position: 'relative',
          // top: 30,
          // left: 100,
          height: 80,
          width: 80,
          // backgroundColor: 'white'
        }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Mars clicked!")} style={{
        // backgroundColor: "#FF9933",
        width: "17%",
        padding: 0,
        height: -1,
        top: -40,
        left: 286
      }} >
        <Image source={require("../assets/Mars.png")} style={{
          // resizeMode: 'cover',
          // position: 'relative',
          // top: 30,
          // left: 100,
          height: 70,
          width: 70,
          // backgroundColor: 'white'
        }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Jupiter clicked!")} style={{
        // backgroundColor: "#FF9933",
        width: "27%",
        padding: 0,
        height: -20,
        top: -15,
        left: 210
      }} >
        <Image source={require("../assets/Jupiter.png")} style={{
          // resizeMode: 'cover',
          // position: 'relative',
          // top: 30,
          // left: 100,
          height: 110,
          width: 110,
          // backgroundColor: 'white'
        }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Saturn clicked!")} style={{
        // backgroundColor: "#FF9933",
        width: "28%",
        padding: 0,
        height: -10,
        top: -25,
        left: 95
      }} >
        <Image source={require("../assets/Saturn.png")} style={{
          // resizeMode: 'cover',
          // position: 'relative',
          // top: 30,
          // left: 100,
          height: 115,
          width: 115,
          // backgroundColor: 'white'
        }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Uranus clicked!")} style={{
        // backgroundColor: "#FF9933",
        width: "24%",
        padding: 0,
        height: -10,
        top: 0,
        left: 170
      }} >
        <Image source={require("../assets/Uranus.png")} style={{
          // resizeMode: 'cover',
          // position: 'relative',
          // top: 30,
          // left: 100,
          height: 100,
          width: 100,
          // backgroundColor: 'white'
        }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Neptune clicked!")} style={{
        // backgroundColor: "#FF9933",
        width: "19%",
        padding: 0,
        height: -10,
        top: -35,
        left: 315
      }} >
        <Image source={require("../assets/Neptune.png")} style={{
          // resizeMode: 'cover',
          // position: 'relative',
          // top: 30,
          // left: 100,
          height: 80,
          width: 80,
          // backgroundColor: 'white'
        }} />
      </TouchableOpacity>
      {/* <View> */}
      {/* <TouchableOpacity onPress={() => Alert.alert("image clicked")}>
          <Image
            source={require("../assets/Mercury.png")}
            // style={{
            //   resizeMode: "contain",
            //   top: -112,
            //   left: -115,
            //   position: "absolute",
            //   height: "50%",
            //   width: "80%",
            //   flex: 1,
            // }}
          />
        </TouchableOpacity> */}
      {/* </View> */}
      {/* <Image
        source={require("../assets/Venus.png")}
        style={{
          resizeMode: "contain",
          top: -523,
          left: -130,
          position: "absolute",
          height: "150%",
          width: "150%",
        }}
      />
      <Image
        source={require("../assets/Earth.png")}
        style={{
          resizeMode: "contain",
          top: -280,
          left: -80,
          position: "absolute",
          height: "100%",
          width: "150%",
        }}
      />
      <Image
        source={require("../assets/Mars.png")}
        style={{
          resizeMode: "contain",
          top: -256,
          left: 180,
          position: "absolute",
          height: "110%",
          width: "70%",
        }}
      />
      <Image
        source={require("../assets/Jupiter.png")}
        style={{
          resizeMode: "contain",
          top: -246,
          left: 38,
          position: "absolute",
          height: "130%",
          width: "130%",
        }}
      />
      <Image
        source={require("../assets/Saturn.png")}
        style={{
          resizeMode: "contain",
          top: -306,
          left: -26,
          position: "absolute",
          height: "165%",
          width: "100%",
        }}
      />
      <Image
        source={require("../assets/Uranus.png")}
        style={{
          resizeMode: "contain",
          top: -226,
          left: 107,
          position: "absolute",
          height: "185%",
          width: "120%",
        }}
      />
      <Image
        source={require("../assets/Neptune.png")}
        style={{
          resizeMode: "contain",
          top: -214,
          left: 234,
          position: "absolute",
          height: "190%",
          width: "85%",
        }}
      /> */}
    </ImageBackground>
  );
};

export default SolarSystemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#744ebf",
    // justifyContent: "center",
    // backgroundColor: "#744ebf",
  },
  img: {
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#FF9933",
    width: "15%",
    padding: 0,
    height: 60,
    top: 84,
    left: 12,
    // borderRadius: 20,
    // alignItems: "center",
    // margin: 10,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "700",
    color: "white",
  },
});
