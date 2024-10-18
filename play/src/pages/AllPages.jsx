import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";
import GameDisplay from "./GameDisplay";
import Category from "./Category";
import Game from "./Game";


export default function AllPages() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/main/:content" element={<GameDisplay />}/>
      <Route path="/category/:type" element={<Category />}/>
      <Route path="/game/:display" element={<Game />}/>
      {/* <Route path="/main/:content" element={<GameDisplay />}/> */}
    </Routes>
  );
}
