import Spotify from 'rn-spotify-sdk';


const ApiPrefix = "https://api.spotify.com/v1";
const spotify_token = "BQCyLnETpH-qu6Qj0PfRlEsNSVDtyXkLWIK0VrrB2H1UuS31iuJUO7qor52duPj6KiDBoAslFX9u9f5ErwhM7b3PrWBvE_Y-tlbYyw4pyaagOQctyC_nDczPIow-kfs-XOkjhVeAZXEE4kDRb5o9kSFUGgLTJWQfMrC8iu8SMtCMY8J9IXUwFkp_uqmqENtPAZfhk8k5IYj76OoEoxwkU0ERrMh-4BqpG85i1d9PRiyGDxdU7M6dqjv2h2xSl6MdaotE_XXrM1tTjhFnsg"
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