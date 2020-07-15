import React, { PureComponent } from "react";
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Spotify from "rn-spotify-sdk";

export default class QueueScreen extends PureComponent {
  render() {
    return (
      <View style={styles.pageWrapper}>
        <View style={styles.logoWrapper}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        </View>

        <View>
          <Text>You are in the queueScreen</Text>
          <Text>The code is: {this.props.navigation.state.params.code}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  pageWrapper: {
    backgroundColor: "#272727",
    height: "100%",
  },
  logoWrapper: {
    paddingTop: 30,
    paddingLeft: 30,
  },
};
