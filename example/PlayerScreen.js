
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
			types: ['tracks','albums','artists','playlists'],
			artist: null,
			tracks: undefined,
			errorMessage: ''
		};

		this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		// send api request to get user info
		Spotify.getMe().then((result) => {
			// update state with user info
			this.setState({ spotifyUserName: result.display_name });
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
		const result = Spotify.search(this.state.query, this.state.types)
			.then(json => this.handleSearch(json))
			.catch(e => {
				this.displayErrorMessage('Please enter a search query')
			});
		return result;
	}

	handleSearch(jsonData) {
		const artist = jsonData.artists.name[0];
		if(artist) {
			this.loadTracks(artist.id);
			return this.updateProfile(artistJSON)
		  } else {
			this.displayErrorMessage('Artist not found, please try again');
			return false;
		}
	}

	loadTracks(artistId) {
		Spotify.getTracks(artistId)
		.then((json) => {
			this.setState({
				tracks: json.tracks
			})
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
				<View style={styles.inputContainer}>
					<TouchableOpacity
						style={styles.enterButton}
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
