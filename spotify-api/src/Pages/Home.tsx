import React, { useEffect, useState } from 'react';
import FavArts from '../Components/FavArts';
import Playlists from '../Components/Playlists';
import { exchangeCodeForToken, fetchPlaylist, getSpotifyAccessToken } from '../api';

function Home() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
  const REDIRECT_URI = 'http://localhost:3000/';
  const SCOPES = ['playlist-read-private', 'playlist-read-collaborative'].join(' ');

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      setLoading(true);
      exchangeCodeForToken(code, REDIRECT_URI)
        .then(() => {
          window.history.replaceState({}, document.title, '/');
          const token = getSpotifyAccessToken();
          if (!token) throw new Error('No token after exchange');
          return fetchPlaylist();
        })
        .then((data) => {
          setPlaylists(data.items);
          setLoading(false);
        })
        .catch((e) => {
          setError((e as Error).message);
          setLoading(false);
        });
    } else {
      const token = getSpotifyAccessToken();
      if (token) {
        setLoading(true);
        fetchPlaylist()
          .then((data) => {
            setPlaylists(data.items);
            setLoading(false);
          })
          .catch((e) => {
            setError((e as Error).message);
            setLoading(false);
          });
      }
    }
  }, []);

  const login = () => {
    const authUrl =
      `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}` +
      `&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  };

  if (loading) return <p>Loading playlists...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p className="title">Mohid's Spotify</p>
      <FavArts />
      <div>
        {!getSpotifyAccessToken() ? (
          <button onClick={login}>Login with Spotify</button>
        ) : (
          <>
            <h2>Your Spotify Playlists</h2>
            <ul>
              {playlists.map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
