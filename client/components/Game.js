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
  const [scoreboard, setScoreboard] = useState([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    dispatch(fetchSongs()); // Dispatch the fetchSongs action to fetch the songs from the store
  }, [dispatch]);

  useEffect(() => {
    if (songs.length > 0) {
      generateRandomArtist(); // Generate a random artist if songs are available
    }
  }, [songs]);

  useEffect(() => {
    if (totalPlays > highScore) {
      setHighScore(totalPlays);
    }
  }, [totalPlays, highScore]);

  const handleCloseModal = () => {
    setShowHighScoreModal(false);
  };

  const generateRandomArtist = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentArtist(songs[randomIndex].artist);
    setMatchingSongs(getMatchingSongs(songs[randomIndex].artist));
  };

  const getMatchingSongs = (artist) => {
    return songs.filter((song) => song.artist.toLowerCase() === artist.toLowerCase());
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSongSelect = (event) => {
    setSongName(event.target.value);
  };

  const handleSongSubmit = (event) => {
    event.preventDefault();
    const song = songs.find((s) => s.artist.toLowerCase() === currentArtist.toLowerCase() && s.name.toLowerCase() === songName.toLowerCase());
    setSongPlays(song?.plays);
    setIsSubmitted(true);
    setScoreboard([...scoreboard, { artist: currentArtist, songName, songPlays: song?.plays }]);
    setTotalPlays(totalPlays + song?.plays);

    if (scoreboard.length === 4) {
      setIsGameCompleted(true);
    } else {
      generateRandomArtist();
    }
  };

  const handleNextArtist = () => {
    setCurrentArtist('');
    setSongName('');
    setMatchingSongs([]);
    setSongPlays('');
    setIsSubmitted(false);
    generateRandomArtist();
  };

  const startGameAgain = () => {
    setIsGameCompleted(false);
    setScoreboard([]);
    setTotalPlays(0);
    generateRandomArtist();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 underline">Game</h1>
      <div>
        <h2 className="text-lg font-bold mb-2">High Score: {formatNumberWithCommas(highScore)}</h2>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Scoreboard</h2>
        {scoreboard.length > 0 ? (
          <div>
            {scoreboard.map((song, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold">Song {index + 1}</h3>
                <p>Artist: {song.artist}</p>
                <p>Song Name: {song.songName}</p>
                <p>Plays: {formatNumberWithCommas(song.songPlays)}</p>
              </div>
            ))}
            {isGameCompleted && (
              <div className="mt-4">
                <p className="text-xl font-bold">
                  TOTAL PLAYS: {formatNumberWithCommas(totalPlays)}
                </p>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded"
                  onClick={startGameAgain}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>No songs selected yet</p>
        )}
      </div>
      {!isSubmitted ? (
        <form onSubmit={handleSongSubmit} className="mt-4">
          <div className="flex items-center mb-2">
            <label className="mr-2">ARTIST:</label>
            <span className="font-bold">{currentArtist}</span>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Name Song:</label>
            <select
              value={songName}
              onChange={handleSongSelect}
              className="border border-gray-400 rounded px-2 py-1"
            >
              <option value="">Select a Song</option>
              {matchingSongs
                .filter((song, index, self) => self.findIndex((s) => s.name === song.name) === index) // Filter out duplicate songs by name
                .map((song) => (
                  <option key={song.id} value={song.name}>
                    {song.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-4">
          {songPlays !== null ? (
            <div>
              {!isGameCompleted && (
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleNextArtist}
                >
                  Next Artist
                </button>
              )}
            </div>
          ) : (
            <p>No plays found for the selected song.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
