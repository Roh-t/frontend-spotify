// App.js (React) - Adjusted for React Router v6 and no Router conflict
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route only (no Router here)
import axios from 'axios'; // Import axios

function SpotifyPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from your external Spotify endpoint using axios
    axios.get('https://spotify-test-five.vercel.app/spotify')
      .then(response => {
        setData(response.data); // Axios response data is in .data
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Spotify data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Spotify Data</h1>
      
      <h2>Now Playing</h2>
      {data.nowPlaying ? (
        <p>
          <strong>{data.nowPlaying.name}</strong> by {data.nowPlaying.artist} 
          ({data.nowPlaying.isPlaying ? 'Playing' : 'Paused'})
        </p>
      ) : (
        <p>Nothing is currently playing.</p>
      )}

      <h2>Top 10 Tracks</h2>
      <ul>
        {data.topTracks.map(track => (
          <li key={track.id}>
            <strong>{track.name}</strong> by {track.artist} 
            <button onClick={() => playTrack(track.id)}>Play</button>
          </li>
        ))}
      </ul>

      <h2>Actions</h2>
      <button onClick={pausePlayback}>Pause Current Song</button>
      <p>Tip: Use the buttons or check the raw JSON below.</p>

      <details>
        <summary>View Raw JSON</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );

  function pausePlayback() {
    axios.put('https://spotify-test-five.vercel.app/spotify/pause')
      .then(response => alert(response.data.message))
      .catch(err => alert('Error: ' + (err.response?.data?.error || err.message)));
  }

  function playTrack(trackId) {
    axios.put(`https://spotify-test-five.vercel.app/spotify/play/${trackId}`)
      .then(response => alert(response.data.message))
      .catch(err => alert('Error: ' + (err.response?.data?.error || err.message)));
  }
}

function App() {
  return (
    <Routes> {/* Use Routes directly (no Router wrapper here) */}
      <Route path="/spotify" element={<SpotifyPage />} /> {/* Use element for v6 */}
      {/* Add other routes here if needed, e.g., <Route path="/" element={<Home />} /> */}
    </Routes>
  );
}

export default App;
