import React, {useState} from 'react';

function PopUp(props) {
  const [input, setInput] = useState({...props.initialValues});

  const handleChange = (event) => {
    const {name, value} = event.target;
    setInput({...input, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submit(input);
  }

  return (
    <>
      <div className='pop-up'>
        <button id="pop-up-close-btn" onClick={props.close}>&times;</button>
        <h1>{props.status === "add"? "Add new movie": "Edit movie"}</h1>
        <form id="movie-form" onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={input.name} onChange={handleChange}
                   placeholder="Enter movie name" required/>
          </div>

          <div className="form-element">
            <label htmlFor="genre">Genre</label>
            <input type="text" name="genre" id="genre" value={input.genre} onChange={handleChange}
                   placeholder="Enter movie genre" required/>
          </div>
          <div className="form-element">
            <label htmlFor="rating">Rating</label>
            <input type="number" name="rating" id="rating" value={input.rating} onChange={handleChange}
                   placeholder="Enter movie rating" min="1" max="10" step="0.1" required/>
          </div>
          <div className="form-element">
            <button id="submit-btn" type="submit">{props.status === "add"? "Done": "Save"}</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PopUp;
