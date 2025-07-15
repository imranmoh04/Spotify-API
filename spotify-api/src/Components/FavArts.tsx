import React from 'react'
import { useEffect, useState } from 'react'
import { fetchArist } from '../api'
import '../css/FavArts.css'


const favArtIds= [
  '4q3ewBCX7sLwd24euuV69X',
  '2pAWfrd7WFF3XhVt9GooDL',
  '0du5cEVh5yTK9QJze8zA0C',
]

export default function FavArts() {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const token = localStorage.getItem('spotifyAccessToken');
        if (!token) {
        console.error('No Spotify access token found');
        return;
        }
        const data = await fetchArist(favArtIds,token);
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) return <p>Loading artists...</p>;

  return (
    <div>
      <h2 className='fav-art-title'>My Favorite Artists</h2>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            <img src={artist.images[0]?.url} alt={artist.name} width={100} />
            <p>{artist.name}</p>
            <p>Genres: {artist.genres.join(', ')}</p>
            <p>Followers: {artist.followers.total.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

