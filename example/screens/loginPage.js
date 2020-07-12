import React, { Component, useState } from "react";
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

// Import external libraries

const loginWithAppleMusic = () => {
  console.log("Logging in with Apple Music");
};

export default function LoginPage() {
  const [code, setCode] = useState("");

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.logoWrapper}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      </View>
      <View style={styles.hookWrapper}>
        <Text style={styles.hook}>Let your Friends add Music to your Queue, because why not?</Text>
      </View>
      <View style={styles.loginTextWrapper}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.horizontalRule}></View>
      <View style={styles.spotifyButtonWrapper}>
        <TouchableOpacity onPress={loginWithAppleMusic} style={styles.spotifyButton}>
          <Text style={styles.spotifyText}>Spotify</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.appleMusicButtonWrapper}>
        <TouchableOpacity onPress={loginWithAppleMusic} style={styles.appleMusicButton}>
          <Text style={styles.appleMusicText}>Apple Music</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#272727",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  logoWrapper: {
    marginTop: 90,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 200,
    alignSelf: "center",
  },
  hookWrapper: {
    marginTop: 70,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  hook: {
    alignSelf: "center",
    fontSize: 20,
    color: "#EEEEEE",
  },
  loginTextWrapper: {
    marginTop: 70,
  },
  loginText: {
    alignSelf: "center",
    fontSize: 26,
    color: "#EEEEEE",
  },
  horizontalRule: {
    marginLeft: 70,
    marginRight: 70,
    marginTop: 12,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
  },
  spotifyButtonWrapper: {
    marginTop: 25,
  },
  spotifyButton: {
    backgroundColor: "#EEEEEE",
    width: "auto",
    paddingHorizontal: 20,
    height: 40,
    alignSelf: "center",
    borderRadius: 20,
  },
  spotifyText: {
    color: "#272727",
    alignSelf: "center",
    fontSize: 20,
    paddingTop: 8,
  },
  appleMusicButtonWrapper: {
    marginTop: 25,
  },
  appleMusicButton: {
    backgroundColor: "#EEEEEE",
    width: "auto",
    paddingHorizontal: 20,
    height: 40,
    alignSelf: "center",
    borderRadius: 20,
  },
  appleMusicText: {
    color: "#272727",
    alignSelf: "center",
    fontSize: 20,
    paddingTop: 8,
  },
});
