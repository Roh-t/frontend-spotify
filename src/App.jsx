// App.js (React)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

  // Helper functions for actions (calls your local backend - adjust if needed)
  function pausePlayback() {
    axios.put('/spotify/pause') // Assuming proxy to your backend
      .then(response => alert(response.data.message))
      .catch(err => alert('Error: ' + (err.response?.data?.error || err.message)));
  }

  function playTrack(trackId) {
    axios.put(`/spotify/play/${trackId}`) // Assuming proxy to your backend
      .then(response => alert(response.data.message))
      .catch(err => alert('Error: ' + (err.response?.data?.error || err.message)));
  }
}

function App() {
  return (
    <Router>
      <Route path="/spotify" component={SpotifyPage} />
      {/* Add other routes here */}
    </Router>
  );
}

export default App;
