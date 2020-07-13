import Spotify from 'rn-spotify-sdk';


const ApiPrefix = "https://api.spotify.com/v1";
const spotify_token = "BQDvlygiGN2Bi4NJY4xRnh7XyuUWXtft7srH3NnkKpgHYOoDU3WBaYnmfap0FuxhoBHZK20v4WXCUCcaHHoDJIEIDMG5NFPlBShuAf5Tx0wn_p_xxuMfHRA6VmLrsix-bzBorRZf6HcLaz8JzdR1n-llm2Wgi4I29QZbTxjSj986nwRlpoa7HMGlfsW6tuc7wqEulbTbLMTl61tBrLVKjJUPL9S23aV8kq_cU44k6ymAVRXy4LGhljif93B-nlgcQDV10OFgdjcYVvCJag"
// const spotify_token = Spotify.authenticate

const SpotifySearch = {
    getSearchUri: (query) => {
        return `${ApiPrefix}/search?q=${encodeURI(query)}&type=artist,track&limit=5`
    },

    getSongsUri: (artistId) => {
        return `${ApiPrefix}/artists/${artistId}/top-tracks?country=US&`;
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
        const searchUri = SpotifySearch.getSearchUri(artistId);
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