const BACKEND_URL = 'http://localhost:3000/api/spotify-token';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export const exchangeCodeForToken = async (code: string, redirectUri: string) => {
  const response = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirectUri }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();

  if (typeof window !== 'undefined') {
    localStorage.setItem('spotifyAccessToken', data.access_token);
    localStorage.setItem('spotifyRefreshToken', data.refresh_token);
    localStorage.setItem('spotifyTokenExpiresAt', (Date.now() + data.expires_in * 1000).toString());
  }

  return data;
};

export const getSpotifyAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('spotifyAccessToken');
  const expiresAt = localStorage.getItem('spotifyTokenExpiresAt');
  if (token && expiresAt && Date.now() < Number(expiresAt)) {
    return token;
  }
  return null;
};

export const fetchPlaylist = async () => {
  const token = getSpotifyAccessToken();
  if (!token) throw new Error('No valid Spotify access token found');

  const response = await fetch(`${SPOTIFY_API_URL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlists');
  }

  return response.json();
};


export const fetchArist = async (artistIds: string[], accessToken: string) => {
  const idsParam = artistIds.join(',');

  const response = await fetch(`${SPOTIFY_API_URL}/artists?ids=${idsParam}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch artist');
  }  

  const data = await response.json();
  return data.artists;
};