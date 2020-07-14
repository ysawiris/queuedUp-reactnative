import React, { PureComponent } from "react";
import { Alert, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Spotify from "rn-spotify-sdk";

export default class QueueScreen extends PureComponent {
  render() {
    return (
      <View>
        <Text>You are in the queueScreen</Text>
        <Text>The code is: {this.props.navigation.state.params.code}</Text>
      </View>
    );
  }
}
