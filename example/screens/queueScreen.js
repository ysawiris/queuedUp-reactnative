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
import SpotifySearch from "./../spotifySearch";

export default class QueueScreen extends PureComponent {
  static navigationOptions = {
    title: "Player",
  };

  constructor(props) {
    super(props);

    this.state = {
      spotifyUserName: null,
      query: "",
      types: ["track"],
      artist: null,
      tracks: {
        items: [],
      },
      errorMessage: "",
      uri: null,
    };

    this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
    this.search = this.search.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    // send api request to get user info
    Spotify.getMe()
      .then((result) => {
        // update state with user info
        this.setState({ spotifyUserName: result.display_name });
        console.log(this.state.spotifyUserName);
        // play song
        // return Spotify.playURI("spotify:track:0W9E3s2G4szLUwXsE17x5E", 0, 0);
      })
      .then(() => {
        // success
      })
      .catch((error) => {
        // error
        Alert.alert("Error", error.message);
      });
  }

  goToInitialScreen() {
    this.props.navigation.navigate("initial");
  }

  spotifyLogoutButtonWasPressed() {
    Spotify.logout().finally(() => {
      this.goToInitialScreen();
    });
  }

  search() {
    const result = Spotify.search(this.state.query, this.state.types, Spotify.authenticate.options)
      .then((json) => this.handleSearch(json))
      .catch((err) => {
        console.log(err);
      });
    return result;
  }

  handleSearch(jsonData) {
    const song_items = jsonData.tracks;
    // console.log(song_items)

    if (song_items) {
      this.setState({ tracks: song_items });
      // this.setState({ uri: uri})
      // return Spotify.playURI(this.state.tracks.uri, 0, 0);
      console.log("tracks!");
      console.log(this.state.tracks);
      console.log(`Playing uri: ${this.state.tracks.items[0].uri}`);
      Spotify.playURI(this.state.tracks.items[0].uri, 0, 0);
    } else {
      this.displayErrorMessage("Artist not found, please try again");
      return false;
    }
  }

  loadTracks(artistId) {
    SpotifySearch.getSongs(artistId).then((json) => {
      this.setState({
        tracks: json,
      });
    });
  }

  displayErrorMessage(message) {
    this.setState({
      errorMessage: message,
    });
  }

  handleNameChange(query) {
    this.setState({ query });
  }

  render() {
    const { query } = this.state;
    const itemsData = this.state.tracks.items.map((item) => {
      return (
        <View>
          <Text key={item.id}>{item.name}</Text>

          {/* Map() function for artists */}
          <Text>{item.artists[0].name}</Text>
        </View>
      );
    });

    return (
      <View style={styles.pageWrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.logoWrapper}>
            <Image source={require("../assets/images/logo.png")} style={styles.logo} />
          </View>
          <View style={styles.topRightCorner}>
            <Image style={styles.playIcon} source={require("../assets/images/play_icon.png")} />
            <Image style={styles.playSongIcon} source={require("../assets/images/song1.png")} />
          </View>
        </View>

        <View style={styles.searchWrapper}>
          <View style={styles.searchSongsWrapper}>
            <Text style={styles.searchSongsText}>Search for Songs</Text>
          </View>
          <View style={styles.songSearchBoxWrapper}>
            <TextInput
              style={styles.songSearchBox}
              // placeholder="No Complaints"
              placeholderTextColor="#EEEEEE"
              // onChangeText={(newText) => this.handleChangeText(newText)}
              onBlur={Keyboard.dismiss}
              value={this.state.query}
              onChangeText={this.handleNameChange}
              // value={text}
              // onChangeText={(text) => this.setState({ code: text })}
              // defaultValue={this.state.text}
            />
          </View>
          <View>
            <TouchableOpacity onPress={this.search}>
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
          <TouchableHighlight onPress={this.spotifyLogoutButtonWasPressed}>
            <Text>Logout</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.queueWrapper}>
          <Text style={styles.queueText}>Current Queue</Text>
          <ScrollView>
            <View style={styles.songCardWrapper}>
              <View style={styles.albumCoverWrapper}>
                <Image style={styles.albumCover} source={require("../assets/images/song1.png")} />
              </View>
              <View style={styles.songInfoWrapper}>
                <Text numberOfLines={1} style={styles.songTitle}>
                  West Coast Love
                </Text>
                <Text numberOfLines={1} style={styles.songArtist}>
                  Emotional Oranges
                </Text>
                <Text numberOfLines={1} style={styles.songAlbum}>
                  The Juice, Vol 2
                </Text>
              </View>
            </View>
            <View style={styles.songCardWrapper}>
              <View style={styles.albumCoverWrapper}>
                <Image style={styles.albumCover} source={require("../assets/images/song2.png")} />
              </View>
              <View style={styles.songInfoWrapper}>
                <Text numberOfLines={1} style={styles.songTitle}>
                  Daydream
                </Text>
                <Text numberOfLines={1} style={styles.songArtist}>
                  Ash
                </Text>
                <Text numberOfLines={1} style={styles.songAlbum}>
                  Single
                </Text>
              </View>
            </View>
            <View style={styles.songCardWrapper}>
              <View style={styles.albumCoverWrapper}>
                <Image style={styles.albumCover} source={require("../assets/images/song3.png")} />
              </View>
              <View style={styles.songInfoWrapper}>
                <Text numberOfLines={1} style={styles.songTitle}>
                  Run It Up (feat. Pusha T)
                </Text>
                <Text numberOfLines={1} style={styles.songArtist}>
                  NAV
                </Text>
                <Text numberOfLines={1} style={styles.songAlbum}>
                  Good Intentions
                </Text>
              </View>
            </View>
            <View style={styles.songCardWrapper}>
              <View style={styles.albumCoverWrapper}>
                <Image style={styles.albumCover} source={require("../assets/images/song1.png")} />
              </View>
              <View style={styles.songInfoWrapper}>
                <Text numberOfLines={1} style={styles.songTitle}>
                  West Coast Love
                </Text>
                <Text numberOfLines={1} style={styles.songArtist}>
                  Emotional Oranges
                </Text>
                <Text numberOfLines={1} style={styles.songAlbum}>
                  The Juice, Vol 2
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
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
