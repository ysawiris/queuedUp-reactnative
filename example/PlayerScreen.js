import React, { PureComponent } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
} from "react-native";
import Spotify from "rn-spotify-sdk";

export default class PlayerScreen extends PureComponent {
    static navigationOptions = {
        title: "Player",
    };

    constructor(props) {
        super(props);

        this.state = {
            spotifyUserName: null,
            spotifyProfile: null,
            logger: null,
        };

        this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(
            this
        );
    }

    componentDidMount() {
        // send api request to get user info
        Spotify.getMe()
            .then((result) => {
                // update state with user info
                this.setState({
                    spotifyUserName: result.display_name,
                });
                this.setState({
                    spotifyProfilePic: result.images[0].url,
                });
                // Check if User is in the database
                return (
                    fetch(
                        "https://app.getshortstack.com/api/_execute/d030d85b-a694-40c5-a87f-ae2480488841?username=" +
                            result.display_name
                    )
                        // .then((response) => response.text())
                        .then((response) => {
                            Alert.alert("Response", response.status);
                            if (response.status === 404) {
                                throw Error("user not found");
                            }
                            return response;
                        })
                        .then((json) => {
                            console.log("user was found");
                            console.log(json);
                            Alert.alert("Json", json);
                        })
                        .catch((error) => {
                            console.log("chechking if user exists");
                            console.error(error);
                            Alert.alert("Error", error.message);
                            // User does not exsit, this fetch adds the User to the database
                            fetch(
                                "https://app.getshortstack.com/api/_execute/971583ec-0a64-41d5-98fb-4f94d04cc9bb",
                                {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        username: result.display_name,
                                        profile: result,
                                    }),
                                }
                            );
                        })
                );

                // // play song
                // return Spotify.playURI(
                //     "spotify:track:0W9E3s2G4szLUwXsE17x5E",
                //     0,
                //     0
                // );
            })
            .then(() => {})
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

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{
                        uri: this.state.spotifyProfilePic,
                    }}
                    style={{ height: 100, width: 100 }}
                />
                {this.state.spotifyUserName != null ? (
                    <Text style={styles.greeting}>
                        You are logged in as {this.state.spotifyUserName}
                    </Text>
                ) : (
                    <Text style={styles.greeting}>Getting user info...</Text>
                )}
                <TouchableHighlight
                    onPress={this.spotifyLogoutButtonWasPressed}
                >
                    <Text>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    greeting: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
});
