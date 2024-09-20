import React from "react";
import AllPages from "./pages/AllPages";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <AllPages />
    </Router>
  );
}
