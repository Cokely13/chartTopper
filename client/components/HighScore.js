import React, { useState } from 'react';

function HighScoreModal({ showModal, onClose }) {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>CONGRATS!! YOU GOT THE HIGH SCORE!!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default HighScoreModal
