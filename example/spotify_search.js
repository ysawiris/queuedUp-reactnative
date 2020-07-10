const ApiPrefix = "https://api.spotify.com/v1";

const SpotifySearch = {
    getSearchUri: (query) => {
        return `${ApiPrefix}/search?q=${encodeURI(query)}&type=artist&limit=5`
    },

    getSongsUri: (artistId) => {
        return `${ApiPrefix}/artists/${artistId}/top-tracks?country=US&`;
    },

    search: (query) => {
        const searchUri = SpotifySearch.getSearchUri(query);
        return fetch(searchUri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    },

    getSongs: (artistId) => {
        const searchUri = SpotifySearch.getSearchUri(artistId);
        return fetch(searchUri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    }
}

export default Spotify;