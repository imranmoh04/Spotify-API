const API_KEY ="7a304b3316f34b709a543dad2b7f4c94"
const API_URL = "https://api.spotify.com/v1"

export const fetchTopTracks = async (token) => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data.results;
};

export const fetchTrackDetails = async (trackId, token) => {}
