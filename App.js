import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Platform
  /* Button */ 
} from "react-native"; //etiqueta <p> o similar
//View = DIV, Image Textinput ScrollView Stylsheet Button
//import image from "./assets/cantera.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
/* const handleOnPress = ()=>{
  return window.alert("presionaste")
} */

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permisos para acceder a la cámara son requeridos");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    if(Platform.OS ==="web") {
     const remoteUri =  await uploadToAnonymousFilesAsync(pickerResult.uri)
 
     setSelectedImage({localUri: pickerResult.uri, remoteUri})

    }else{
      setSelectedImage({ localUri: pickerResult.uri });
    }
    
  };


  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Te image is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige una imagen</Text>
      <Pressable onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://picsum.photos/200/300",
          }}
          style={styles.image}
        />
      </Pressable>

      {selectedImage ? (
        <Pressable onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Compartir imagen</Text>
        </Pressable>
      ) : (
        <View />
      )}
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
  image: { height: 200, width: 200, borderRadius: 100, /* resizeMode: "contain"  */},
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 20 },
});
export default App;
