// SongSelector.js
import React from 'react';

const SongSelector = ({ isSubmitted, currentArtist, songName, matchingSongs, handleSongSelect, handleSongSubmit, songPlays, isGameCompleted, handleNextArtist, formatNumberWithCommas, totalPlays, highScore }) => {
  return (
    <div className="song-selector-container">
      {!isSubmitted ? (
        <form onSubmit={handleSongSubmit} className="mt-4">
          <div className="flex items-center mb-2">
            <label className="mr-2"><b>ARTIST:</b> <span className="font-bold">{currentArtist}</span></label>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2"><b>Name Song:</b></label>
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
          <div className='mid'>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4">
          {songPlays !== null ? (
            <div>
              {!isGameCompleted && (
                <div className='next'>
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
              <h2>{totalPlays === highScore ? "Congrats on the High Score!" : "Sorry you Failed!"}</h2>
            </div>
          )}
    </div>
  );
};

export default SongSelector;
