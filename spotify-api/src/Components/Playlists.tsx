import { useEffect, useState } from 'react';
import { fetchPlaylist } from '../api';
import '../css/Playlists.css';

const YourComponent = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const token = localStorage.getItem('spotifyAccessToken');
        if (!token) {
          console.error('No Spotify access token found');
          return;
        }

        const data = await fetchPlaylist();
        setPlaylists(data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  if (loading) return <p>Loading playlists...</p>;

  return (
    <div>
      <h2>Your Spotify Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
