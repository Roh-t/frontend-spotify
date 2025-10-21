// App.js (React)
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function SpotifyPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://spotify-test-five.vercel.app/spotify') // Proxy to backend
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching Spotify data:', err));
  }, []);

  return (
    <div>
      <h2>Spotify Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Pretty-print JSON */}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/spotify" element={<SpotifyPage />} />
    </Routes>
  );
}

export default App;
