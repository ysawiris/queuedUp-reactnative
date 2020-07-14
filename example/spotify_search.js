import Spotify from 'rn-spotify-sdk';


const ApiPrefix = "https://api.spotify.com/v1";
const spotify_token = "BQAdDeObKwP2ZtSqSzGQw7hARklvUE79p9VjTjiwAvJ353ABju7p--SSG6bL7IY09CDQwHGmbHk2adMz-jpQW4NnZJTyc-JwcUrpp2EhrecQTrVYP11HGAeEoXJcuxq6ss1TvqbkLSAdqtre02dmWmtalXg-wnUK5JMWAkkRlbbG8f8ipA0NibDKJM3wyWN4nVsQYCAcPycv0QscP4WYtwd8bF0u1iYhqGKr_bhqjpg89rIGcAcH7KHN8w7qhel61UWLYdFHRURskcZ6VA"
// const spotify_token = Spotify.authenticate

const SpotifySearch = {
    getSearchUri: (query) => {
        return `${ApiPrefix}/search?q=${encodeURI(query)}&type=artist,track&limit=5`
    },

    getSongsUri: (artistId) => {
        return `${ApiPrefix}/search?q=${encodeURI(artistId)}&type=track&limit=5`
    },

    search: async (query) => {
        const searchUri = SpotifySearch.getSearchUri(query);

        return fetch(searchUri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${spotify_token}`
            }
        })
        .then(response => response.json())
    },

    getSongs: (artistId) => {
        const searchUri = SpotifySearch.getSongsUri(artistId);
        return fetch(searchUri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${spotify_token}`
            }
        })
        .then(response => response.json())
    }
}

export default SpotifySearch;