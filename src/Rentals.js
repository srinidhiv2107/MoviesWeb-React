import React from 'react';
import Heading from "./Components/Heading";
import NavBar from "./Components/NavBar";
import Line from "./Components/Line";

function Rentals() {
  return (
    <>
      <Heading/>
      <NavBar style={{width: "450px", height: "73.2px"}} genreAndSearch={false}/>
      <Line className="top-line"/>
      <h2 style={{textAlign: "center"}}>This is rentals page</h2>
    </>
  );
}

export default Rentals;
