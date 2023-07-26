// import React, { useState } from 'react';

// const SongSelector = ({ isSubmitted, currentArtist, matchingSongs, handleSongSubmit, songPlays, isGameCompleted, handleNextArtist, formatNumberWithCommas, totalPlays, highScore, songName, setSongName }) => {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [suggestedSongs, setSuggestedSongs] = useState([]);

//   const hasAtLeastThreeMatchingLetters = (input, songName) => {
//     if (input.length < 3) return false;

//     const inputLetters = input.toLowerCase().split('');
//     let count = 0;
//     for (let i = 0; i <= songName.length - 3; i++) {
//       const substring = songName.substring(i, i + 3).toLowerCase();
//       if (inputLetters.every((letter, index) => substring[index] === letter)) {
//         count++;
//         if (count >= 3) {
//           return true;
//         }
//       }
//     }

//     return false;
//   };

//   const handleInputChange = (event) => {
//     const input = event.target.value;
//     setSongName(input);
//     setShowSuggestions(input.length > 0);

//     if (input.length >= 3) {
//       const filteredSongs = matchingSongs.filter((song) =>
//         hasAtLeastThreeMatchingLetters(input, song.name)
//       );
//       setSuggestedSongs(filteredSongs);
//     } else {
//       setSuggestedSongs([]);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleSongSubmit(event);
//   };

//   const handleSuggestionClick = (selectedSongName) => {
//     setSongName(selectedSongName);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="song-selector-container">
//       {!isSubmitted ? (
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="flex items-center mb-2">
//             <label className="mr-2">
//               <b>ARTIST:</b> <span className="font-bold">{currentArtist}</span>
//             </label>
//           </div>
//           <div className="flex items-center mb-2">
//             <label className="mr-2">
//               <b>Name Song:</b>
//             </label>
//             <input
//               type="text"
//               value={songName}
//               onChange={handleInputChange}
//               onFocus={() => setShowSuggestions(songName.length > 0)} // Show suggestions on input focus
//               className="border border-gray-400 rounded px-2 py-1"
//             />
//           </div>
//           {showSuggestions && suggestedSongs.length > 0 && (
//             <div className="suggestions">
//               <p>Suggestions:</p>
//               <ul>
//                 {suggestedSongs.map((song) => (
//                   <li key={song.id} onClick={() => handleSuggestionClick(song.name)}>
//                     {song.name}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           <div className="mid">
//             <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
//               Submit
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="mt-4">
//           {songPlays !== null ? (
//             <div>
//               {!isGameCompleted && (
//                 <div className="next">
//                   <button
//                     className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//                     onClick={handleNextArtist}
//                   >
//                     Next Artist
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p>No plays found for the selected song.</p>
//           )}
//         </div>
//       )}
//       {isGameCompleted && (
//         <div className="result">
//           <h2>{totalPlays === highScore ? 'Congrats on the High Score!' : 'Sorry you Failed!'}</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SongSelector;

import React, { useState } from 'react';

const SongSelector = ({ isSubmitted, currentArtist, matchingSongs, handleSongSubmit, songPlays, isGameCompleted, handleNextArtist, formatNumberWithCommas, totalPlays, highScore, songName, setSongName }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedSongs, setSuggestedSongs] = useState([]);

  const hasAtLeastThreeMatchingLetters = (input, songName) => {
    if (input.length < 3) return false;

    const inputLetters = input.toLowerCase().split('');
    const songNameLowerCase = songName.toLowerCase();

    for (let i = 0; i <= songNameLowerCase.length - 3; i++) {
      const substring = songNameLowerCase.substring(i, i + 3);
      let count = 0;

      for (let j = 0; j < inputLetters.length; j++) {
        if (inputLetters[j] === substring[j]) {
          count++;
        }
      }

      if (count >= 3) {
        return true;
      }
    }

    return false;
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSongName(input);
    setShowSuggestions(input.length > 0);

    if (input.length >= 3) {
      const filteredSongs = matchingSongs.filter((song) =>
        hasAtLeastThreeMatchingLetters(input, song.name)
      );
      setSuggestedSongs(filteredSongs);
    } else {
      setSuggestedSongs([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSongSubmit(event);
  };

  const handleSuggestionClick = (selectedSongName) => {
    setSongName(selectedSongName);
    setShowSuggestions(false);
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
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Submit
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
    </div>
  );
};

export default SongSelector;
