import React, { Component } from "react";
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default class SearchBar extends Component {
  constructor({ text }) {
    super();

    this.state = {
      text: text || "",
    };
  }

  handleChangeText(newText) {
    const { onChange } = this.props;

    this.setState(
      {
        text: newText,
      },
      () => {
        onChange && onChange(newText);
      }
    );
  }

  render() {
    const { text } = this.state;
    return (
      <View style={styles.songSearchBoxWrapper}>
        <TextInput
          style={styles.songSearchBox}
          // placeholder="No Complaints"
          placeholderTextColor="#EEEEEE"
          onChangeText={(newText) => this.handleChangeText(newText)}
          // value={text}
          // onChangeText={(text) => this.setState({ code: text })}
          defaultValue={this.state.text}
        />
      </View>
    );
  }
}

const styles = {
  songSearchBoxWrapper: {
    marginTop: 20,
  },
  songSearchBox: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#5D5D5D",
    width: 270,
    height: 45,
    borderRadius: 20,
    color: "#EEEEEE",
    fontSize: 20,
    textAlign: "center",
  },
};
