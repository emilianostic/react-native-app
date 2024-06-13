import React from "react";
import { Text, View, StyleSheet, Image } from "react-native"; //etiqueta <p> o similar
//View = DIV, Image Textinput ScrollView Stylsheet

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola</Text>
      <Image source={{uri:"https://picsum.photos/200/200"}}
      style={styles.image}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#292929"  },
  title: { fontSize: 30, color: "#fff" },
  image: {height:200, width: 200}
});
export default App;
