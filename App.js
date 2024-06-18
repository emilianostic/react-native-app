import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  /* Button */ Alert,
} from "react-native"; //etiqueta <p> o similar
//View = DIV, Image Textinput ScrollView Stylsheet Button
//import image from "./assets/cantera.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing"
/* const handleOnPress = ()=>{
  return window.alert("presionaste")
} */

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permios para acceder a la cámara son requeridos");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige una imagen</Text>
      <TouchableOpacity
      onPress={openImagePickerAsync}>
      <Image
        source={{
          uri:
            selectedImage !== null
              ? selectedImage.localUri
              : "https://picsum.photos/200/200",
        }}
        style={styles.image}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{console.log("hola")}} style={styles.button}>
        <Text style={styles.buttonText}>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  title: { fontSize: 30, color: "#fff" },
  image: { height: 200, width: 200, borderRadius: 100, resizeMode: "contain" },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 20 },
});
export default App;
