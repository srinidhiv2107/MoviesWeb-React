import React from 'react';
import Heading from "./Components/Heading";
import Line from "./Components/Line";
import NavBar from "./Components/NavBar";

function Customers() {
  return (
    <>
      <Heading/>
      <NavBar style={{width: "450px", height: "73.2px"}} genreAndSearch={false}/>
      <Line className="top-line"/>
      <h2 style={{textAlign: "center"}}>This is customers page</h2>
    </>
  );
}

export default Customers;
