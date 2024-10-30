import React from "react";
import AllPages from "./pages/AllPages";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { GamesContext } from "./context/ProfileContext";

export default function App() {
  return (
    <GamesContext>
      <Router>
        <Navbar />
        <AllPages />
      </Router>
    </GamesContext>
  );
}
