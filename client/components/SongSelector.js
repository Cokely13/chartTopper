import React, { useState } from 'react';

const SongSelector = ({ isSubmitted, currentArtist, matchingSongs, handleSongSubmit, songPlays, isGameCompleted, handleNextArtist, formatNumberWithCommas, totalPlays, highScore, songName, setSongName, setSkipped, skipped }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);

  const hasAtLeastThreeMatchingLetters = (input, songName) => {
    if (input.length < 4) return false;

    const inputLetters = input.toLowerCase().split('');
    const songNameLowerCase = songName.toLowerCase();

    for (let i = 0; i <= songNameLowerCase.length - 4; i++) {
      const substring = songNameLowerCase.substring(i, i + 4);
      let count = 0;

      for (let j = 0; j < inputLetters.length; j++) {
        if (inputLetters[j] === substring[j]) {
          count++;
        }
      }

      if (count >= 4) {
        return true;
      }
    }

    return false;
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSongName(input);
    setShowSuggestions(input.length > 0);

    if (input.length >= 4) {
      const filteredSongs = matchingSongs.filter((song) =>
        hasAtLeastThreeMatchingLetters(input, song.name)
      );
      setSuggestedSongs(filteredSongs);
    } else {
      setSuggestedSongs([]);
    }
  };

  const handleSkip = (event) => {
    event.preventDefault();
    setSkipped(true)
    setShowSkipConfirmation(true); // Show the confirmation modal
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleSongSubmit(event);
  };

  const handleSuggestionClick = (selectedSongName) => {
    setSongName(selectedSongName);
    setShowSuggestions(false);
  };

  const confirmSkip = (event) => {
    setShowSkipConfirmation(false); // Hide the confirmation modal
    console.log("skipped", skipped)
    handleSongSubmit(event); // If you want to proceed with song submission after skipping
    // handleNextArtist(); // If you want to proceed to the next artist after skipping
  };

  const cancelSkip = () => {
    setSkipped(false);
    setShowSkipConfirmation(false); // Hide the confirmation modal
  };

  return (
    <div className="song-selector-container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center mb-2">
            <label className="mr-2">
              <b>ARTIST:</b> <span className="font-bold">{currentArtist}</span>
            </label>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">
              <b>Name Song:</b>
            </label>
            <input
              type="text"
              value={songName}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(songName.length > 0)} // Show suggestions on input focus
              className="border border-gray-400 rounded px-2 py-1"
            />
          </div>
          {showSuggestions && suggestedSongs.length > 0 && (
            <div className="suggestions">
              <p>Suggestions:</p>
              <ul>
                {suggestedSongs.map((song) => (
                  <li key={song.id} onClick={() => handleSuggestionClick(song.name)}>
                    {song.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mid">
            <button type="submit">
              Submit
            </button>
          </div>
          <div>
          <button type="button" className="skip" onClick={(event) => handleSkip(event)}>
                Skip
             </button>
        </div>
        </form>
      ) : (
        <div className="mt-4">
          {songPlays !== null ? (
            <div>
              {!isGameCompleted && (
                <div className="next">
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextArtist}
                  >
                    Next Artist
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>No plays found for the selected song.</p>
          )}
        </div>
      )}
      {isGameCompleted && (
        <div className="result">
          <h2>{totalPlays === highScore ? 'Congrats on the High Score!' : 'Sorry you Failed!'}</h2>
        </div>
      )}
        {showSkipConfirmation && (
        <div className="skip-confirmation-modal">
          <p>Are you sure you want to skip?</p>
          <button onClick={(event) => confirmSkip(event)}>Yes</button>
          <div>
          <button onClick={cancelSkip}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongSelector;



