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
  Alert,
} from "react-native";
import Spotify from "rn-spotify-sdk";
import SpotifySearch from "./../spotifySearch";
import SearchScreen from "./searchScreen";

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
      tracks: [],
      errorMessage: "",
      uri: null,
      test: [],
      showSearch: false,
      currentQueueTracks: [],
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
    const song_items = jsonData.tracks.items;
    // console.log(song_items)

    if (song_items) {
      this.setState({
        tracks: song_items,
        showSearch: true,
      });
      // this.setState({ uri: uri})
      // return Spotify.playURI(this.state.tracks.uri, 0, 0);
      console.log(this.state.tracks);
      // Spotify.playURI(this.state.tracks.items[0].uri, 0, 0);
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

  updateCurrentQueue = (newSong) => {
    let currentQueueTracks = [...this.state.currentQueueTracks];
    currentQueueTracks.push(newSong);
    this.setState({ currentQueueTracks });
    console.log("Current queue tracks");
    // console.log(this.state.currentQueueTracks);
  };

  toggleSearch = () => {
    this.setState({ showSearch: false });
  };

  renderQueue = (tracks) => {
    console.log("Tracks from renderQueue", tracks);

    if (!tracks) {
      return (
        <View style={styles.queueWrapper}>
          <Text style={styles.queueText}>Current Queue</Text>
          <Text style={styles.queueText}>No songs</Text>
        </View>
      );
    }

    return (
      <View style={styles.queueWrapper}>
        <Text style={styles.queueText}>Current Queue</Text>
        <ScrollView>
          {tracks.map((item) => (
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
          ))}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { query } = this.state;

    console.log(`Current tracks:`);
    console.log(this.state.currentQueueTracks);

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
          <View style={styles.searchComponentWrapper}>
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
              <TouchableOpacity onPress={this.search} style={styles.searchButton}>
                <Image style={styles.searchIcon} source={require("../assets/images/search_icon.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableHighlight style={styles.logoutWrapper} onPress={this.spotifyLogoutButtonWasPressed}>
            <Text>Logout</Text>
          </TouchableHighlight>
        </View>

        {this.state.showSearch ? (
          <SearchScreen
            tracks={this.state.tracks}
            toggleSearch={this.toggleSearch}
            updateCurrentQueue={this.updateCurrentQueue}
          />
        ) : (
          this.renderQueue(this.state.currentQueueTracks)
        )}
      </View>
    );
  }
}

const styles = {
  logoutWrapper: {
    marginTop: 6,
  },
  searchIcon: {
    marginTop: 3,
    height: 40,
    width: 40,
  },
  searchComponentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: "#5D5D5D",
    width: 45,
    height: 45,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 18,
    marginLeft: 3,
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
