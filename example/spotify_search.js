import Spotify from 'rn-spotify-sdk';


const ApiPrefix = "https://api.spotify.com/v1";
// const spotify_token = "BQBNW2Gy5u5syvtq5ScCI-4m4NVqTNfJwPP6wRbZBYOhwwEIv8MIHGmpynFfQBpxdrm_tl4jUKMiJvHWPxfLXYklLwv8azWUDO75tx-W_GBZ4U-e8NeqVevFMN9I8Rl_gJwTFjEDK4nEy2agI0dhW6zaqDD2eSQ8BcPcdBXn833yg-noldOiHZXvg5wqQ13FVWi4nvAV86uxBPFonYR_uqKuLGoE6uGFMve6Isb5iQtplo7KaU84W6zMfq87Z-cQUDqmp3ChNIqP213XfA"
const spotify_token = Spotify.authenticate

const SpotifySearch = {
    getSearchUri: (query) => {
        return `${ApiPrefix}/search?q=${encodeURI(query)}&type=artist&limit=5`
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
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    }
}

export default SpotifySearch;