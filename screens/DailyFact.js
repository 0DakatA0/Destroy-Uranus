import {
    StyleSheet,
    Text,
    View,
    Image
  } from "react-native";
import {useState,useEffect} from 'react';

const url = "https://api.nasa.gov/planetary/apod?api_key=qzXavvTLhxwcEuBXc8uBygbnQEdrdhdBsfNKuGoH";

const DailyFact = () => {
    //const navigation = useNavigation();
    const [name, setName] = useState([]);
    const [image, setImage] = useState([]);
    const [text, setText] = useState([]);

    useEffect(() => {
        fetch(url)
          .then((response) => response.json()) // get response, convert to json
          .then((json) => {
            setName(json.title);
            setImage(json.hdurl);
            setText(json.explanation);
          })
          .catch((error) => alert(error)) // display errors
      }, []);
    
      async function getFactAsync() {
        try {
            let response = await fetch(url);
            let json = await response.json();
            setName(json.title);
            setImage(json.hdurl);
            setText(json.explanation);
        } catch (error) {
          alert(error);
        }
    }

    return (
        <View>
            {/* Title from URL */}
            <Text>Did you know that ... ? </Text>
            <Text>Did you know that ... ? </Text>
            <Text>Did you know that ... ? </Text>
            <Text>Did you know that ... ? </Text>
            <Text>Did you know that ... ? </Text>
            <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
            <Text>{name}</Text>
            <Text>{text}</Text>
            {/* ne raboti ama gram ---> <Image source={image}/>     -----*/}
        </View>   
    );
}

export default DailyFact;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
});
  