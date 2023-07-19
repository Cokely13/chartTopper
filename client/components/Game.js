// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchSongs, createSong } from '../store/allSongsStore';

// function Game() {
//   return (
//     <div>Game</div>
//   )
// }

// export default Game

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, createSong, getSongPlays } from '../store/allSongsStore';

function Game() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.allSongs);
  const [currentArtist, setCurrentArtist] = useState('');
  const [songName, setSongName] = useState('');
  const [matchingSongs, setMatchingSongs] = useState([]);
  const [songPlays, setSongPlays] = useState(null);

  useEffect(() => {
    dispatch(fetchSongs()); // Dispatch the fetchSongs action to fetch the songs from the store
  }, [dispatch]);

  const handleArtistChange = (event) => {
    setCurrentArtist(event.target.value);
    setMatchingSongs(getMatchingSongs(event.target.value));
  };

  const getMatchingSongs = (artist) => {
    return songs.filter((song) => song.artist.toLowerCase().includes(artist.toLowerCase()));
  };

  const handleSongChange = (event) => {
    setSongName(event.target.value);
    setMatchingSongs(getMatchingSongs(currentArtist));
  };

  const handleSongSubmit = (event) => {
    event.preventDefault();
    const song = songs.find((s) => s.artist.toLowerCase() === currentArtist.toLowerCase() && s.name.toLowerCase() === songName.toLowerCase());
    if (song) {
      dispatch(getSongPlays(song.id))
        .then((plays) => setSongPlays(plays))
        .catch((error) => console.error('Error fetching song plays:', error));
    } else {
      setSongPlays(null);
    }
  };

  return (
    <div>
      <h1>Game</h1>
      <div>
        <label>ARTIST:</label>
        <input type="text" value={currentArtist} onChange={handleArtistChange} />
      </div>
      <div>
        <label>Name Song:</label>
        <input type="text" value={songName} onChange={handleSongChange} />
      </div>
      <ul>
        {matchingSongs.map((song) => (
          <li key={song.id}>
            {song.name} - {song.artist}
          </li>
        ))}
      </ul>
      {songPlays !== null && <p>Plays: {songPlays}</p>}
      <button onClick={handleSongSubmit}>Submit</button>
    </div>
  );
}

export default Game;
