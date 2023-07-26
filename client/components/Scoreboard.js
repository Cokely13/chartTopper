// Scoreboard.js
import React from 'react';

const Scoreboard = ({ scoreboard, totalPlays, isGameCompleted, formatNumberWithCommas, startGameAgain }) => {
  return (
    <div className="scoreboard-container">
      <h2 className="scoreboard">Scoreboard</h2>
      {scoreboard.length > 0 ? (
        <div>
          {scoreboard.map((song, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">Song {index + 1}: {song.songName}</h3>
              <p>Artist: {song.artist}</p>
              {/* <p>Song Name: {song.songName}</p> */}
              <p>Plays: {formatNumberWithCommas(song.songPlays)}</p>
            </div>
          ))}
          {isGameCompleted && (
            <div className="mt-4">
              <p className="text-xl font-bold">
                TOTAL PLAYS: {formatNumberWithCommas(totalPlays)}
              </p>
              <div className="try">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded"
                  onClick={startGameAgain}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No songs selected yet</p>
      )}
    </div>
  );
};

export default Scoreboard;
