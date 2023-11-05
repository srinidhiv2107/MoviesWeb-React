/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {titleCase} from "./Credentials";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  return (
    <nav style={props.style}>
      <NavLink to="/" activeclassname={"active"}>Home</NavLink>
      <NavLink to="/rentals" activeclassname={"active"}>Rentals</NavLink>
      <NavLink to="/customers" activeclassname={"active"}>Customers</NavLink>
      { props.genreAndSearch &&
        <>
        <div className="genre-container">
          <label htmlFor="genres-list">Genre</label>
          <select id="genres-list" value={props.selectedGenre}
                  onChange={(event) => props.handleGenreChange(event.target.value)}>
            <option value="all">All</option>
            {Object.keys(props.genres).map((genre, index) => (
              <option key={index} value={genre}>{titleCase(genre)}</option>
            ))}
          </select>
        </div>
        <form className="search-box">
          <label htmlFor="search-bar"><i className="material-icons">search</i></label>
          <input type="text" id="search-bar" placeholder="Search" value={props.searchText}
                 onChange={(event) => props.handleSearch(event.target.value)}/>
        </form>
        </>
      }
    </nav>
  );
}

export default NavBar;
