import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Rentals from "./Rentals";
import Customers from "./Customers";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/rentals" element={ <Rentals/> }/>
      <Route path="/customers" element={ <Customers/> }/>
    </Routes>
  );
}

export default App;
/* "homepage": "https://srinidhiv2107.github.io/MoviesWeb-React", */
