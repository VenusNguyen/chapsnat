import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password (6+ characters)"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            onChangeText={setName}
          />
        </View>
  
        <TouchableOpacity
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={onPressCreate}
        >
        <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const offset = 16;
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
      alignItems: "center",
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
    buttonContainer: {
      height: 45,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      width: 300,
      borderRadius: 30,
      backgroundColor: "transparent",
    },
    signupButton: {
      backgroundColor: Colors.snapblue,
    },
    signupText: {
      color: "white",
      fontWeight: "bold",
    },
    inputContainer: {
      borderBottomColor: "#F5FCFF",
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      borderBottomWidth: 1,
      borderBottomWidth: 1,
      width: 300,
      height: 45,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: "#FFFFFF",
      flex: 1,
    },
  });