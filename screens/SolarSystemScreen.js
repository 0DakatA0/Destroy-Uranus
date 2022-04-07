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
import PlanetModal from "../components/PlanetModal";

import MercuryData, {
  requiredPointsToAccessMercury,
} from "../data/MercuryData.json";
import {VenusData,  requiredPointsToAccessVenus } from "../data/VenusData.json";
import {EarthData,  requiredPointsToAccessEarth } from "../data/EarthData";
import {MarsData,  requiredPointsToAccessMars } from "../data/MarsData.json";
import {JupiterData, 
  requiredPointsToAccessJupiter,
} from "../data/JupiterData.json";
import {SaturnData,  requiredPointsToAccessSaturn } from "../data/SaturnData.json";
import {UranusData,  requiredPointsToAccessUranus } from "../data/UranusData.json";
import {NeptuneData, 
  requiredPointsToAccessNeptune,
} from "../data/NeptuneData.json";

const SolarSystemScreen = ({ navigation: { navigate } }) => {
  // const navigation = useNavigation();

  const [showMercury, setShowMercury] = useState(false);
  const [showVenus, setShowVenus] = useState(false);
  const [showEarth, setShowEarth] = useState(false);
  const [showMars, setShowMars] = useState(false);
  const [showJupiter, setShowJupiter] = useState(false);
  const [showSaturn, setShowSaturn] = useState(false);
  const [showUranus, setShowUranus] = useState(false);
  const [showNeptune, setShowNeptune] = useState(false);
  // const [showPlanet, setShowPlanet] = useState(false);

  const handlePressMercury = () => {
    setShowMercury(true);
  };

  const handlePressVenus = () => {
    setShowVenus(true);
  };

  const handlePressEarth = () => {
    setShowEarth(true);
  };

  const handlePressMars = () => {
    setShowMars(true);
  };

  const handlePressJupiter = () => {
    setShowJupiter(true);
  };

  const handlePressSaturn = () => {
    setShowSaturn(true);
  };

  const handlePressUranus = () => {
    setShowUranus(true);
  };

  const handlePressNeptune = () => {
    setShowNeptune(true);
  };

  const handleConfirmMercury = () => {
    setShowMercury(false);
  };

  const handleConfirmVenus = () => {
    setShowVenus(false);
  };

  const handleConfirmEarth = () => {
    setShowEarth(false);
  };

  const handleConfirmMars = () => {
    setShowMars(false);
  };

  const handleConfirmJupiter = () => {
    setShowJupiter(false);
  };

  const handleConfirmSaturn = () => {
    setShowSaturn(false);
  };

  const handleConfirmUranus = () => {
    setShowUranus(false);
  };

  const handleConfirmNeptune = () => {
    setShowNeptune(false);
  };

  return (
    <ImageBackground
      source={require("../assets/Path.png")}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={handlePressMercury}
        style={{
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
            height: 60,
            width: 60,
          }}
        />
        <PlanetModal
          isVisible={showMercury}
          title="Mercury"
          onConfirm={handleConfirmMercury}
          imageSource={require("../assets/Mercury.png")}
          data={MercuryData}
          reqPoints={requiredPointsToAccessMercury}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressVenus}
        style={{
          width: "17%",
          padding: 0,
          height: -10,
          top: 24,
          left: 100,
        }}
      >
        <Image
          source={require("../assets/Venus.png")}
          style={{
            height: 70,
            width: 70,
          }}
        />
        <PlanetModal
          isVisible={showVenus}
          title="Venus"
          onConfirm={handleConfirmVenus}
          imageSource={require("../assets/Venus.png")}
          data={VenusData}
          // reqPoints={VenusData[0].requiredPointsToAccess}
          reqPoints={requiredPointsToAccessVenus}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressEarth}
        style={{
          width: "19%",
          padding: 0,
          height: -10,
          top: -40,
          left: 200,
        }}
      >
        <Image
          source={require("../assets/Earth.png")}
          style={{
            height: 80,
            width: 80,
          }}
        />
        <PlanetModal
          isVisible={showEarth}
          title="Earth"
          onConfirm={handleConfirmEarth}
          imageSource={require("../assets/Earth.png")}
          data={EarthData}
          reqPoints={requiredPointsToAccessEarth}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressMars}
        style={{
          width: "17%",
          padding: 0,
          height: -1,
          top: -40,
          left: 286,
        }}
      >
        <Image
          source={require("../assets/Mars.png")}
          style={{
            height: 70,
            width: 70,
          }}
        />
        <PlanetModal
          isVisible={showMars}
          title="Mars"
          onConfirm={handleConfirmMars}
          imageSource={require("../assets/Mars.png")}
          data={MarsData}
          reqPoints={requiredPointsToAccessMars}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressJupiter}
        style={{
          width: "27%",
          padding: 0,
          height: -20,
          top: -15,
          left: 210,
        }}
      >
        <Image
          source={require("../assets/Jupiter.png")}
          style={{
            height: 110,
            width: 110,
          }}
        />
        <PlanetModal
          isVisible={showJupiter}
          title="Jupiter"
          onConfirm={handleConfirmJupiter}
          imageSource={require("../assets/Jupiter.png")}
          data={JupiterData}
          reqPoints={requiredPointsToAccessJupiter}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressSaturn}
        style={{
          width: "28%",
          padding: 0,
          height: -10,
          top: -25,
          left: 95,
        }}
      >
        <Image
          source={require("../assets/Saturn.png")}
          style={{
            height: 115,
            width: 115,
          }}
        />
        <PlanetModal
          isVisible={showSaturn}
          title="Saturn"
          onConfirm={handleConfirmSaturn}
          imageSource={require("../assets/Saturn.png")}
          data={SaturnData}
          reqPoints={requiredPointsToAccessSaturn}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressUranus}
        style={{
          width: "24%",
          padding: 0,
          height: -10,
          top: 0,
          left: 170,
        }}
      >
        <Image
          source={require("../assets/Uranus.png")}
          style={{
            height: 100,
            width: 100,
          }}
        />
        <PlanetModal
          isVisible={showUranus}
          title="Uranus"
          onConfirm={handleConfirmUranus}
          imageSource={require("../assets/Uranus.png")}
          data={UranusData}
          reqPoints={requiredPointsToAccessUranus}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressNeptune}
        style={{
          width: "19%",
          padding: 0,
          height: -10,
          top: -35,
          left: 315,
        }}
      >
        <Image
          source={require("../assets/Neptune.png")}
          style={{
            height: 80,
            width: 80,
          }}
        />
        <PlanetModal
          isVisible={showNeptune}
          title="Neptune"
          onConfirm={handleConfirmNeptune}
          imageSource={require("../assets/Neptune.png")}
          data={NeptuneData}
          reqPoints={requiredPointsToAccessNeptune}
        />
      </TouchableOpacity>
      <View
        style={{
          alignSelf: "center",
          bottom: 10,
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Choose a planet!
        </Text>
        <Button
          title="Go Back"
          onPress={() => {
            // update(ref(rdb, "users/" + user.uid), {
            //   score,
            // }); <----------------------------- TO BE FIXED
            navigate("Home");
          }}
        />
      </View>
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
});
