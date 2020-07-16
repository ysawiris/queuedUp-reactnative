import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
} from "react-native";

import Spotify from "rn-spotify-sdk";

export default class SearchScreen extends PureComponent {
  static navigationOptions = {
    title: "Player",
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.toggleSearch();
  };

  handleAddToQueueClick = (item) => {
    Spotify.queue.addTrack(item.uri);
    this.props.updateCurrentQueue(item);
    this.props.toggleSearch();
  };

  render() {
    const searchResults = this.props.tracks.map((item) => {
      return (
        <View key={item.id} style={styles.fullSongCardWrapper}>
          <View key={item.id} style={styles.songCardWrapper}>
            <View style={styles.albumCoverWrapper}>
              <Image
                source={{
                  uri: item.album.images[0].url,
                }}
                style={styles.albumCover}
              />
            </View>
            <View style={styles.songInfoWrapper}>
              <Text numberOfLines={1} style={styles.songTitle}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.songArtist}>
                {item.artists[0].name}
              </Text>
              <Text numberOfLines={1} style={styles.songAlbum}>
                {item.album.name}
              </Text>
            </View>
          </View>
          <View style={styles.addToQueueButtonWrapper}>
            <TouchableOpacity style={styles.addToQueueButton} onPress={() => this.handleAddToQueueClick(item)}>
              <Image style={styles.addIcon} source={require("../assets/images/plus_icon.png")}></Image>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
    return (
      <View style={styles.queueWrapper}>
        <TouchableOpacity onPress={this.handleClick}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.queueText}>Search Results</Text>
        <ScrollView>{searchResults}</ScrollView>
      </View>
    );
  }
}

const styles = {
  addIcon: {
    height: 40,
    width: 40,
    alignSelf: "center",
    marginTop: 20,
  },
  addToQueueButtonWrapper: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  addToQueueButton: {
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 80,
    alignSelf: "center",
    borderRadius: 20,
  },
  fullSongCardWrapper: {
    flexDirection: "row",
    alignItems: "space-between",
  },
  songInfoWrapper: {
    marginLeft: 10,
  },
  songArtist: {
    fontSize: 17,
    fontWeight: "400",
    color: "#272727",
  },
  songAlbum: {
    fontSize: 13,
    fontWeight: "100",
    color: "#272727",
  },
  songTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#272727",
  },
  albumCover: {
    height: 60,
    width: 60,
  },
  queueText: {
    fontSize: 20,
    color: "#EEEEEE",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 3,
  },
  songCardWrapper: {
    flexDirection: "row",
    alignItems: "space-between",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    height: 80,
    width: 250,
  },
  queueWrapper: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 15,
    height: "100%",
    paddingTop: 10,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  searchSongsText: {
    color: "#EEEEEE",
    fontSize: 23,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  playIcon: {
    height: 50,
    width: 50,
    marginLeft: 3,
  },
  playSongIcon: {
    height: 50,
    width: 52,
    borderRadius: 20,
    marginLeft: 32,
  },
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
  topRightCorner: {
    flexDirection: "row",
    alignItems: "space-between",
    height: 50,
    width: 100,
    marginLeft: 55,
    marginRight: 30,
    marginTop: 40,
    backgroundColor: "#EEEEEE",
    flex: 1,
    borderRadius: 20,
  },
  pageWrapper: {
    backgroundColor: "#272727",
    height: "100%",
  },
  logoWrapper: {
    paddingTop: 30,
    paddingLeft: 15,
    flex: 1,
  },
  logo: {
    resizeMode: "contain",
    height: 70,
    width: 150,
  },
};
