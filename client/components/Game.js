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
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchSongs()); // Dispatch the fetchSongs action to fetch the songs from the store
  }, [dispatch]);

  useEffect(() => {
    if (songs.length > 0) {
      generateRandomArtist(); // Generate a random artist if songs are available
    }
  }, [songs]);

  const generateRandomArtist = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentArtist(songs[randomIndex].artist);
    setMatchingSongs(getMatchingSongs(songs[randomIndex].artist));
  };

  const getMatchingSongs = (artist) => {
    return songs.filter((song) => song.artist.toLowerCase() === artist.toLowerCase());
  };

  const handleSongSelect = (event) => {
    setSongName(event.target.value);
  };

  const handleSongSubmit = (event) => {
    event.preventDefault();
    const song = songs.find((s) => s.artist.toLowerCase() === currentArtist.toLowerCase() && s.name.toLowerCase() === songName.toLowerCase());
    setSongPlays(song.plays)
    setIsSubmitted(true);

  };

  return (
    <div>
      <h1>Game</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSongSubmit}>
          <div>
            <label>ARTIST:</label>
            <span>{currentArtist}</span>
          </div>
          <div>
            <label>Name Song:</label>
            <select value={songName} onChange={handleSongSelect}>
              <option value="">Select a Song</option>
              {matchingSongs.map((song) => (
                <option key={song.id} value={song.name}>
                  {song.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          {songPlays !== null ? (
            <p>That song has {songPlays} plays!!</p>
          ) : (
            <p>No plays found for the selected song.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
