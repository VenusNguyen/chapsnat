import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import firebase from "@firebase/app";
import Colors from "../constants/Colors";
import React, { useState, useEffect } from "react";


export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onPressCreate = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(onSuccess, onFailure);
  };
  const onSuccess = (userCredential) => {
    console.log("SUCCESS");
    var curr_user = userCredential.user;
    curr_user.updateProfile({
      displayName: name,
    });
  };
  const onFailure = () => {
    alert("Sign up failure. Please try again.");
  };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Email:</Text>
        <TextInput style={styles.nameInput} onChangeText={setEmail} />
        <Text style={styles.title}>Password (6+ characters):</Text>
        <TextInput style={styles.nameInput} onChangeText={setPassword} secureTextEntry={true}/>
        <Text style={styles.title}>Name:</Text>
        <TextInput style={styles.nameInput} onChangeText={setName} />
  
        <Button
          onPress={onPressCreate}
          title="Sign up"
          color={Colors.snapblue}
          accessibilityLabel="Sign up"
        />
      </View>
    );
  }
  
  const offset = 16;
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.snapyellow,
    },
    title: {
      marginTop: offset,
      marginLeft: offset,
      fontSize: offset,
    },
    nameInput: {
      height: offset * 2,
      margin: offset,
      paddingHorizontal: offset,
      borderColor: "#111111",
      borderWidth: 1,
      fontSize: offset,
    },
    buttonText: {
      marginLeft: offset,
      fontSize: 42,
    },
  });