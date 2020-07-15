
import React, { PureComponent } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	ScrollView,
	TextInput,
	Keyboard,
	TouchableOpacity,
	Image
} from 'react-native';
import Spotify from 'rn-spotify-sdk';
import SpotifySearch from './spotify_search';
import SearchBar from './SearchBar';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


export default class PlayerScreen extends PureComponent {
	static navigationOptions = {
		title: 'Player',
	};

	constructor(props) {
		super(props);

		this.state = {
			spotifyUserName: null,
			query: "",
			types: ['track'],
			artist: null,
			tracks: {
				items: []
			},
			errorMessage: '',
			uri: null,
		};

		this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
		this.search = this.search.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	componentDidMount() {
		// send api request to get user info
		Spotify.getMe().then((result) => {
			// update state with user info
			this.setState({ spotifyUserName: result.display_name });
			console.log(this.state.spotifyUserName)
			// play song
			// return Spotify.playURI("spotify:track:0W9E3s2G4szLUwXsE17x5E", 0, 0);
		}).then(() => {
			// success
		}).catch((error) => {
			// error
			Alert.alert("Error", error.message);
		});


	}

	goToInitialScreen() {
		this.props.navigation.navigate('initial');
	}

	spotifyLogoutButtonWasPressed() {
		Spotify.logout().finally(() => {
			this.goToInitialScreen();
		});
	}

	search() {
		const result = Spotify.search(this.state.query,this.state.types, Spotify.authenticate.options)
			.then(json => this.handleSearch(json))
			.catch(err => {
				console.log(err)
			});
		return result;
	}

	handleSearch(jsonData) {
		const song_items = jsonData.tracks;
		// console.log(song_items)

		if(song_items) {
			this.setState({ tracks: song_items })
			// this.setState({ uri: uri})
			// return Spotify.playURI(this.state.tracks.uri, 0, 0);
			console.log(this.state.tracks)

		} else {
			this.displayErrorMessage('Artist not found, please try again');
			return false;
		}
	}

	loadTracks(artistId) {
		SpotifySearch.getSongs(artistId)
		.then((json) => {
			this.setState({
				tracks: json
			})
		})
	}

	// updateProfile(jsonData) {
	// 	const artist =jsonData.artists.items[0];
	// 	this.setState({
	// 	  artist: artist, 
	// 	  errorMessage: ''
	// 	});
	// 	return jsonData;
	// }

	displayErrorMessage(message) {
		this.setState({
		  errorMessage: message
		});
	}

	handleNameChange(query) {
		this.setState({ query });
	}

	// showInfo = () => {
	// 	return (
	// 		// <View>
	// 		// 	<Text>{this.state.tracks.name}</Text>
	// 		// 	<Text>{this.state.tracks.artists[0]}</Text>
	// 		// </View>
	// 		this.state.tracks.items.map((item) => {
	// 				return (
	// 					<Text>{item.name}</Text>
	// 				)
	// 			})
			
	// 	);
	// }


	render() {
		const { query } = this.state;
		const itemsData = this.state.tracks.items.map(item => {
			return (
				<View>
					<Text key={item.id}>{item.name}</Text>
					
					{/* Map() function for artists */}
					<Text>{item.artists[0].name}</Text>
					<Image
						source={{
							uri : item.album.images[0].url
						}}
						style={{ height: 100, width: 100}}
					/>
				</View>
			)
		}) 

		return (
			<View style={styles.container}>
				{ this.state.spotifyUserName!=null ? (
					<Text style={styles.greeting}>
						You are logged in as {this.state.spotifyUserName}
					</Text>
				) : (
					<Text style={styles.greeting}>
						Getting user info...
					</Text>
				)}
				<TouchableHighlight onPress={this.spotifyLogoutButtonWasPressed}>
					<Text>Logout</Text>
				</TouchableHighlight>
				<ScrollView>
					<View style={styles.inputContainer}>
						<TextInput
						style={styles.textInput}
						placeholder="Search for Song"
						onBlur={Keyboard.dismiss}
						value={this.state.query}
						onChangeText={this.handleNameChange}
						/>
					</View>
				</ScrollView>
				<View style={styles.inputContainer}>
					<TouchableOpacity
						style={styles.enterButton}
						onPress={this.search}
					>
						<Text style={styles.enterButtonText}>Enter</Text>
					</TouchableOpacity>
				</View>

				{/* <View style={styles.contianer}>
					<Image
						source={{
							uri : this.state.uri
						}}
						style={{ height: 100, width: 100}}
					/>
				</View>
				<Text>{this.state.tracks.name}</Text>
				{/* <Text>{this.state.tracks ? this.state.tracks.artists[0].name : null}</Text> */}
				<ScrollView>
					{ itemsData }
				</ScrollView>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
	},
	greeting: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	inputContainer: {
		paddingTop: 15
	  },
	textInput: {
		borderColor: '#CCCCCC',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		height: 50,
		fontSize: 25,
		paddingLeft: 20,
		paddingRight: 20
	},
	enterButton: {
		borderWidth: 1,
		borderColor: '#007BFF',
		backgroundColor: '#007BFF',
		padding: 15,
		margin: 5
	  },
	  enterButtonText: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center'
	  }
	  
});
