import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, createSong, getSongPlays } from '../store/allSongsStore';
import './game.css';

import Scoreboard from './Scoreboard';
import SongSelector from './SongSelector';

function Game() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.allSongs);
  const [currentArtist, setCurrentArtist] = useState('');
  const [songName, setSongName] = useState('');
  const [skipped, setSkipped] = useState(false);
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
    return number ?  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): '0'
  };

  const handleSongSelect = (event) => {
    setSongName(event.target.value);
  };


  const handleSongSubmit = (event) => {
    event.preventDefault();
    console.log("skip!!!", scoreboard.length)
    console.log("complete!!!", isGameCompleted)
    if(skipped){
      setIsSubmitted(true);
      console.log("skipper!!!", skipped)
      setTotalPlays(totalPlays + 0);
    setScoreboard([...scoreboard, { artist: currentArtist, songName: "Skipped", songPlays: 0 }]);
    if (scoreboard.length === 4) {
      setIsGameCompleted(true);
    } else {
      generateRandomArtist();
    }
    }

    if (!songName && !skipped) {
      console.log("skipper", skipped)
      // If no song is selected, show an error message or take appropriate action
      alert('Please select a song before submitting.');
      return;
    }

    const song = songs.find((s) => s.artist.toLowerCase() === currentArtist.toLowerCase() && s.name.toLowerCase() === songName.toLowerCase());
    setSongPlays(song?.plays);
    setIsSubmitted(true);
    setScoreboard([...scoreboard, { artist: currentArtist, songName, songPlays: song?.plays }]);
    setTotalPlays(totalPlays + (song? song?.plays : 0));


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
    setSkipped(false)
    generateRandomArtist();
  };

  const startGameAgain = () => {
    setIsGameCompleted(false);
    setScoreboard([]);
    setTotalPlays(0);
    generateRandomArtist();
  };

  return (
    <div>
      <div className="high">
        <h2>High Score: {formatNumberWithCommas(highScore)}</h2>
      </div>
      <div className="container" >
        <Scoreboard
          scoreboard={scoreboard}
          totalPlays={totalPlays}
          isGameCompleted={isGameCompleted}
          formatNumberWithCommas={formatNumberWithCommas}
          startGameAgain={startGameAgain}
        />
        <SongSelector
          isSubmitted={isSubmitted}
          currentArtist={currentArtist}
          songName={songName}
          skipped={skipped}
          setSkipped={setSkipped}
          setSongName={setSongName}
          matchingSongs={matchingSongs}
          handleSongSelect={handleSongSelect}
          handleSongSubmit={handleSongSubmit}
          totalPlays={totalPlays}
          songPlays={songPlays}
          highScore={highScore}
          isGameCompleted={isGameCompleted}
          handleNextArtist={handleNextArtist}
          formatNumberWithCommas={formatNumberWithCommas}
        />
      </div>
    </div>
  );
}

export default Game;
