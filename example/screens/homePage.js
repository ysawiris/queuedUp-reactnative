import React, { Component, useState } from "react";
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

// Import external libraries

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 0,
    };
  }

  onPress() {
    console.log("hello-world");
  }

  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.logoWrapper}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        </View>
        <View style={styles.enterFriendsCodeTextWrapper}>
          <Text style={styles.enterFriendsCodeText}>Enter Friend's Code</Text>
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.friendsCodeInputWrapper}>
          <TextInput
            style={styles.friendsCodeInput}
            placeholder="628432"
            placeholderTextColor="#EEEEEE"
            onChangeText={(text) => this.setState({ code: text })}
            defaultValue={this.state.code}
          />
        </View>
        <View style={styles.submitCodeButtonWrapper}>
          <TouchableOpacity onPress={() => this.onPress} style={styles.submitCodeButton}>
            <Text style={styles.codeButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.enterFriendsCodeTextWrapper}>
          <Text style={styles.enterFriendsCodeText}>Have the Aux?</Text>
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.submitCodeButtonWrapper}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("routeLoginPage")}
            style={styles.submitCodeButton}
          >
            <Text style={styles.codeButtonText}>Get QueuedUp!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
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
  enterFriendsCodeTextWrapper: {
    marginTop: 70,
  },
  enterFriendsCodeText: {
    alignSelf: "center",
    fontSize: 26,
    color: "#EEEEEE",
  },
  horizontalRule: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 12,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
  },
  friendsCodeInputWrapper: {
    marginTop: 30,
  },
  friendsCodeInput: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#5D5D5D",
    width: 200,
    height: 50,
    borderRadius: 30,
    fontSize: 25,
    textAlign: "center",
  },
  submitCodeButtonWrapper: {
    marginTop: 25,
  },
  submitCodeButton: {
    backgroundColor: "#EEEEEE",
    width: "auto",
    paddingHorizontal: 20,
    height: 40,
    alignSelf: "center",
    borderRadius: 20,
  },
  codeButtonText: {
    color: "#272727",
    alignSelf: "center",
    fontSize: 20,
    paddingTop: 8,
  },
});

export default HomePage;
