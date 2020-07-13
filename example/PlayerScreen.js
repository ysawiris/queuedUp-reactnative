
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
	TouchableOpacity
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
			types: ['artists'],
			artist: null,
			tracks: "",
			errorMessage: ''
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
		const result = SpotifySearch.search(this.state.query, this.state.types)
			.then(json => this.handleSearch(json))
			.catch(err => {
				console.log(err)
			});
		return result;
	}

	handleSearch(jsonData) {
		console.log(jsonData)
		const artist = jsonData.artists.items[0];
		const song_id = jsonData.tracks.items[0];
		console.log(song_id)
		if(artist) {
			this.loadTracks(artist.id);
			return this.updateProfile(jsonData)
		} else if(song_id) {
			this.setState({ tracks: song_id })
			console.log(this.state.tracks)
			return this.updateProfile(jsonData)
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
			console.log(this.state.tracks)
		})
	}

	updateProfile(jsonData) {
		const artist =jsonData.artists.items[0];
		this.setState({
		  artist: artist, 
		  errorMessage: ''
		});
		return jsonData;
	}

	displayErrorMessage(message) {
		this.setState({
		  errorMessage: message
		});
	}

	handleNameChange(query) {
		this.setState({ query });
	}


	render() {
		const { query } = this.state;
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
				{/* <form onSubmit={ (e) => { e.preventDefault(); this.search(); } }>
					<input 
						className="db fl h2 w-90 ba bw2 b--lightest-blue" 
						type="text" 
						placeholder="Search for an artist"
						value={this.state.query}
						onChange={event => {this.setState({query: event.target.value }) }} />
				</form> */}
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
				<Text>Songs:{this.state.tracks.name}</Text>
				<View style={styles.inputContainer}>
					<TouchableOpacity
						style={styles.enterButton}
						onPress={this.search}
					>
						<Text style={styles.enterButtonText}>Enter</Text>
					</TouchableOpacity>
				</View>

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
