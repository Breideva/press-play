import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";

export default function AllPages() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
  );
}
