import React, { PureComponent } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import {} from "react-native";
import Spotify from "rn-spotify-sdk";

export default class LoginPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      spotifyInitialized: false,
    };
    this.spotifyLoginButtonWasPressed = this.spotifyLoginButtonWasPressed.bind(this);
  }

  goToPlayer() {
    this.props.navigation.navigate("player");
  }

  async initializeIfNeeded() {
    // initialize Spotify if it hasn't been initialized yet
    if (!(await Spotify.isInitializedAsync())) {
      // initialize spotify
      const spotifyOptions = {
        clientID: "d5a18c5bffce4415b6281c8d53e2e3af",
        // clientSecret: "332b65ac9bb04f4cbc6ec43077290db9",
        sessionUserDefaultsKey: "SpotifySession",
        redirectURL: "examplespotifyapp://auth",
        scopes: ["user-read-private", "playlist-read", "playlist-read-private", "streaming"],
      };
      const loggedIn = await Spotify.initialize(spotifyOptions);
      // update UI state
      this.setState({
        spotifyInitialized: true,
      });
      // handle initialization
      if (loggedIn) {
        this.goToPlayer();
      }
    } else {
      // update UI state
      this.setState({
        spotifyInitialized: true,
      });
      // handle logged in
      if (await Spotify.isLoggedInAsync()) {
        this.goToPlayer();
      }
    }
  }

  componentDidMount() {
    this.initializeIfNeeded().catch((error) => {
      Alert.alert("Error", error.message);
    });
  }

  spotifyLoginButtonWasPressed() {
    // log into Spotify
    Spotify.login()
      .then((loggedIn) => {
        if (loggedIn) {
          // logged in
          this.goToPlayer();
        } else {
          // cancelled
        }
      })
      .catch((error) => {
        // error
        Alert.alert("Error", error.message);
      });
  }

  render() {
    if (!this.state.spotifyInitialized) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} style={styles.loadIndicator}></ActivityIndicator>
          <Text style={styles.loadMessage}>Loading...</Text>
        </View>
      );
    } else {
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
            <TouchableOpacity onPress={this.spotifyLoginButtonWasPressed} style={styles.spotifyButton}>
              <Text style={styles.spotifyText}>Spotify</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.appleMusicButtonWrapper}>
            <TouchableOpacity onPress={this.spotifyLoginButtonWasPressed} style={styles.appleMusicButton}>
              <Text style={styles.appleMusicText}>Apple Music</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
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

// // Import external libraries

// const loginWithAppleMusic = () => {
//   console.log("Logging in with Apple Music");
// };

// export default function LoginPage() {
//   const [code, setCode] = useState("");

//   return (
//     <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
//       <View style={styles.logoWrapper}>
//         <Image source={require("../assets/images/logo.png")} style={styles.logo} />
//       </View>
//       <View style={styles.hookWrapper}>
//         <Text style={styles.hook}>Let your Friends add Music to your Queue, because why not?</Text>
//       </View>
//       <View style={styles.loginTextWrapper}>
//         <Text style={styles.loginText}>Login</Text>
//       </View>
//       <View style={styles.horizontalRule}></View>
//       <View style={styles.spotifyButtonWrapper}>
//         <TouchableOpacity onPress={loginWithAppleMusic} style={styles.spotifyButton}>
//           <Text style={styles.spotifyText}>Spotify</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.appleMusicButtonWrapper}>
//         <TouchableOpacity onPress={loginWithAppleMusic} style={styles.appleMusicButton}>
//           <Text style={styles.appleMusicText}>Apple Music</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }
