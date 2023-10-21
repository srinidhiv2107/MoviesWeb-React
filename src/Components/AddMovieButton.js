import React from 'react';

function AddMovieButton({addMovie}) {
  return (
    <button id="add-movie-btn" onClick={addMovie}>Add Movie</button>
  );
}

export default AddMovieButton;
